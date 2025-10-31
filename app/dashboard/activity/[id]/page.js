import React from 'react'
import { fetchEmailById } from '@/actions/useractions'
import Sidebar from '@/components/Sidebar'

const ActivityEmailPage = async ({ params }) => {

    const emailId = await params.id

    const email = await fetchEmailById(emailId)

    if (!email) {
        return (
            <div>Email not found</div>
        )
    }

    const campaignId = email.campaignId
    const emailWithCampaign = await prisma.email.findUnique({
        where: { id: emailId },      // your email ID
        include: {
            campaign: true,            // include the related campaign
        },
    });

    const campaign = emailWithCampaign.campaign


    const content = JSON.parse(email.output)
    return (
        <>
            <main className='mx-[17.5vw] min-h-screen'>
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
                                <span className='text-gray-300 text-sm'>{email.recipentEmail} | {campaign.title}</span>
                            </div>
                        </div>
                        <div className='border-b border-gray-600'></div>
                        <div className='flex items-center justify-between h-24'>
                            <div>
                                <p className='hover:underline hover:decoration-cyan-500 hover:decoration-2'>{content?.subject}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                        </div>
                        <div className='border-b border-gray-600'></div>
                        <div className='mt-12'>
                            <p>Hi {email.recipentName},</p>
                            <p>{content.intro}</p>
                            <p>{content.body}</p>
                            <p>{content.closing}</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ActivityEmailPage