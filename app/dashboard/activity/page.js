'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { parseEmailOutput } from '@/lib/parseEmailOutput'
import { fetchEmailById, getEmailsByUserId } from '@/actions/useractions'

const ActivityPage = () => {

    const { data: session, status } = useSession()
    const [emails, setEmails] = useState([])
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    const [toneFilter, setToneFilter] = useState("")
    const [emailType, setEmailType] = useState('')
    const router = useRouter()

    const getEmail = async () => {
        const emailData = await getEmailsByUserId(session.user.id)
        console.log("email data", emailData)

        const formatted = emailData.map(e => {
            const emailQuality = e.emailQuality[0]
            console.log("Quality", emailQuality)
            return {
                id: e.id,
                subject: e.subject,
                intro: e.intro,
                recipentName: e.recipentName,
                company: e.companyName,
                tone: e.Tone,
                createdAt: e.createdAt,
                emailType: e.emailType,
                personalizationScore: emailQuality?.personalizationScore || null,
                websiteContextScore: emailQuality?.websiteContextScore || null
            }
        })
        console.log("Formatted", formatted)
        setEmails(formatted)
    }

    useEffect(() => {
        if (session) {
            getEmail()
        }
    }, [session])

    const toneColor = (tone) => {
        switch (tone) {
            case 'friendly': return 'bg-cyan-700 text-cyan-200'
            case 'professional': return 'bg-blue-800 text-blue-200'
            case 'casual': return 'bg-green-800 text-green-200'
            case 'confident': return 'bg-purple-800 text-purple-200'
            default: return 'bg-gray-700 text-gray-200'
        }
    }

    const filteredEmails = emails.filter(email => {
        const content = email.output || ""
        const matchesSearch =
            email.recipentName.toLowerCase().includes(search.toLowerCase()) ||
            content.toLowerCase().includes(search.toLowerCase())

        const matchesTone = toneFilter ? email.tone === toneFilter : true

        return matchesSearch && matchesTone
    })

    const handleClick = (id) => {
        console.log('Email clicked:', id)
        router.push(`/dashboard/activity/${id}`)
    }


    return (
        <main className='min-h-screen mx-[17.5vw] p-6'>
            <Sidebar />

            <section className='mt-8'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-lg bg-cyan-800 flex items-center justify-center text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className='text-2xl font-semibold'>Activity</h2>
                        <p className='text-gray-300 text-sm mt-1'>Your generated emails and campaigns at a glance.</p>
                    </div>
                </div>

                <div className='mt-6 flex items-center gap-4'>
                    <div className='flex-1'>
                        <input placeholder='Search emails...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full bg-transparent border border-gray-700 rounded-lg p-3 placeholder:text-gray-500 outline-none'
                        />
                    </div>
                    <div>
                        <select className='bg-transparent border border-gray-700 rounded-lg p-3 px-4 text-sm'
                            value={toneFilter}
                            onChange={(e) => setToneFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="casual">Casual</option>
                            <option value="formal">Formal</option>
                            <option value="friendly">Friendly</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {filteredEmails.length === 0 && (
                            <p className="text-gray-400 text-sm">No emails found.</p>
                        )}

                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredEmails.map((email) => (
                        <article onClick={() => handleClick(email.id)}
                            key={email.id}
                            className="cursor-pointer p-5 rounded-xl border border-gray-800
             bg-[#0E1726] hover:bg-[#142034] transition-all duration-200 
             shadow hover:shadow-lg flex flex-col gap-3"
                        >
                            {/* Company Name */}
                            <h3 className="text-white text-lg font-semibold line-clamp-1">
                                {email.company || "Unknown Company"}
                            </h3>

                            {/* Subject */}
                            <p className="text-gray-300 text-sm line-clamp-1">
                                {email.subject}
                            </p>

                            {/* Preview of the email body */}
                            <p className="text-gray-500 text-xs line-clamp-2">
                                {email.intro || email.body}
                            </p>

                            <div className="flex items-center justify-between pt-2">
                                {/* Email Type Badge */}
                                <span className="text-[10px] px-2 py-1 rounded-md bg-blue-900/40 text-blue-300 uppercase font-medium tracking-wide">
                                    {email.emailType.replace("_", " ")}
                                </span>

                                {/* Quality Metrics */}
                                <div className="text-xs text-gray-500 flex gap-3">
                                    <span>🎯 P: {email.personalizationScore ?? 0}</span>
                                    <span>🌐 C: {email.websiteContextScore ?? 0}</span>
                                </div>
                            </div>
                        </article>

                    ))}
                </div>

            </section>
        </main>
    )
}

export default ActivityPage