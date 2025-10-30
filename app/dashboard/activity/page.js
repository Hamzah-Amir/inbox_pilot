'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { getEmailsByUserId } from '@/actions/useractions'

const ActivityPage = () => {

    const { data: session, status } = useSession()
    const [emails, setEmails] = useState([])
    const [emailId, setEmailId] = useState(null)

    const getEmail = async () => {
        const emailData = await getEmailsByUserId(session.user.id)
        const formatted = emailData.map(e => ({
            id: e.id,
            output: e.output,
            recipentName: e.recipentName,
            company: e.CompanyName,
            tone: e.Tone,
        }))
        setEmails(formatted)
    }

    useEffect(() => {
        if (session) {
            getEmail()
            console.log(emails)
        }
    }, [session])

    const toneColor = (tone) => {
        switch (tone.toLowerCase()) {
            case 'friendly': return 'bg-cyan-700 text-cyan-200'
            case 'professional': return 'bg-blue-800 text-blue-200'
            case 'casual': return 'bg-green-800 text-green-200'
            case 'confident': return 'bg-purple-800 text-purple-200'
            default: return 'bg-gray-700 text-gray-200'
        }
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
                        <input placeholder='Search by recipient or company...'
                            className='w-full bg-transparent border border-gray-700 rounded-lg p-3 placeholder:text-gray-500 outline-none'
                        />
                    </div>
                    <div>
                        <select className='bg-transparent border border-gray-700 rounded-lg p-3 px-4 text-sm'>
                            <option>Filter Tone</option>
                        </select>
                    </div>
                    <div>
                        <select className='bg-transparent border border-gray-700 rounded-lg p-3 px-4 text-sm'>
                            <option>Date Range</option>
                        </select>
                    </div>
                </div>

                <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {emails && emails.map((c) => {
                        const id = c.id
                        const output = JSON.parse(c.output)
                        const subject = output.subject
                        console.log(subject)
                        if (!id) return null

                        return (
                            <article key={c.id} className='p-6 rounded-lg border border-gray-700 bg-linear-to-b from-[#0B1624] to-transparent shadow-sm'>
                                <div className='flex justify-between items-start'>
                                    <h3 className='text-md font-semibold text-white'>{subject}</h3>
                                    <div className='text-gray-400'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.94 6.94A10 10 0 1113.06 17.06 10 10 0 012.94 6.94z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between mt-3'>
                                    <div>
                                        <p className='text-gray-400 text-[12px]'>{c.recipentName} • {c.company}</p>
                                    </div>
                                    <div className={`px-2 py-1 rounded-full text-[12px] ${toneColor(c.tone)}`}>{c.tone}</div>
                                </div>

                                <div className='flex justify-end text-gray-400 text-sm mt-4'>
                                    {c.date}
                                </div>
                            </article>
                        )
                    })}

                </div>
            </section>
        </main>
    )
}

export default ActivityPage