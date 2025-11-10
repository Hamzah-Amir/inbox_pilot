'use client'
import React from 'react'
import { fetchEmailQuality, fetchEmailById } from '@/actions/useractions'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useSession } from 'next-auth/react'

const ActivityEmailPage = ({ params }) => {

    const emailId = params.id
    const { data: session, status } = useSession()
    const [email, setEmail] = useState("")
    const [emailQuality, setEmailQuality] = useState()
    const [campaign, setCampaign] = useState("")

    const fetchEmail = async () => {
        const email = await fetchEmailById(emailId)
        const emailQuality = await fetchEmailQuality()
        console.log("Email", email)
        setEmail(email)
        setEmailQuality(emailQuality)
        return email, emailQuality
    }

    let subject;
    let intro;
    let body;
    let cta;
    let closing;

    const fetchCampaign = async () => {
        const campaignId = email.campaignId
        const emailWithCampaign = await fetchEmailById(emailId)
        const campaign = emailWithCampaign.campaign
        setCampaign(campaign)
        return campaign
    }


    useEffect(() => {
        if (status === 'authenticated') {
            fetchEmail()
            fetchCampaign()
        }

    }, [status])



    subject = email.subject;
    intro = email.intro;
    body = email.body;
    cta = email.cta;
    closing = email.closing;
    console.log("Subject", subject)
    console.log("intro", intro)
    console.log("CTA", cta)
    console.log(email)
    if (!email) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='h-10 w-10 border-4 border-red-600 border-t-transparent animate-spin rounded-full'></div>
            </div>
        )
    }
    return (
        <>
            <main className='mx-[17vw] min-h-screen'>
                <Sidebar />
                <section className='min-w-[45vw] min-h-[70vh] mx-[15vw] my-[10vh] rounded-2xl border bg-[#101c33] border-gray-800'>
                    <div className='p-6'>
                        <div className='flex items-center gap-4 mb-6'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">

                                <circle cx="12" cy="12" r="12" fill="#22D3EE" />

                                <path d="M5 8h14v8H5V8zm0 0l7 5 7-5" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                                <h3>{email.recipentName}</h3>
                                <span className='text-gray-300 text-sm'>{campaign.title}</span>
                                {/* <span className='text-gray-300 text-sm'>{email.recipentEmail} | {campaign.title}</span> */}
                            </div>
                        </div>
                        <div className='border-b border-gray-600'></div>
                        <div className='flex items-center justify-between h-24'>
                            <div>
                                <p className='hover:underline hover:decoration-cyan-500 hover:decoration-2'>{subject}</p>

                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                        </div>
                        <div className='border-b border-gray-600'></div>

                        <div className='mt-12'>
                            <p>{intro}</p>
                            <p>{body}</p>
                            <p>{cta}</p>
                            <p>{closing}</p>

                        </div>
                    </div>
                </section>
                <section className='mx-[15vw]'>
                    <div className="mt-12 p-6 rounded-lg border border-gray-700 bg-[#0F1A2C]">
                        <h4 className="text-lg font-semibold mb-3">Email Quality</h4>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                            <div>
                                <p className="font-medium text-white">Personalization Score</p>
                                <p>{0}</p>
                                {/* <p>{emailQuality.personalizationScore || '0'}</p> */}
                            </div>
                            <div>
                                <p className="font-medium text-white">Website Context Score</p>
                                {/* <p>{emailQuality.websiteContextScore || 0}</p> */}
                                <p>{0}</p>
                            </div>
                            <div>
                                <p className="font-medium text-white">Readability Grade (Flesch-Kincaid)</p>
                                <p>{0}</p>
                                {/* <p>{emailQuality.readabilityGrade.toFixed(2) || 0}</p> */}
                            </div>
                            <div>
                                <p className="font-medium text-white">Tone Match</p>
                                {/* <p>{emailQuality.toneMatched ? "Matched" : "Not Matched"}</p> */}
                                <p>{"Not Matched"}</p>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
        </>
    )
}

export default ActivityEmailPage