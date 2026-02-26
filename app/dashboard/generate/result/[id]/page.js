import React from 'react'
import { fetchEmailById, getCampaign } from '@/actions/useractions'
import Sidebar from '@/components/Sidebar'

const ResultPage = async ({ params }) => {

    const emailId = await params.id

    const email = await fetchEmailById(emailId)

    if (!email) {
        return (
            <div>Email not found</div>
        )
    }
    
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
            <main className='ml-0 md:ml-[17.5vw] min-h-screen mt-20 md:mt-0 px-4 md:px-0'>
                <Sidebar />
                <section className='w-full md:min-w-[45vw] md:max-w-3xl min-h-[80vh] mx-auto md:mx-[15vw] my-8 md:my-[10vh] rounded-2xl border bg-[#101c33] border-gray-800 animate-fade-in-up'>
                    <div className='p-4 md:p-6'>
                        <div className='flex items-center gap-3 md:gap-4 mb-6'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" className="md:w-[40px] md:h-[40px]" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="12" fill="#22D3EE" />
                                <path d="M5 8h14v8H5V8zm0 0l7 5 7-5" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                                <h3 className='text-lg md:text-xl font-semibold'>{email.recipentName}</h3>
                                <span className='text-gray-300 text-xs md:text-sm break-all'>{email.recipentEmail} | {campaign.title}</span>
                            </div>
                        </div>
                        <div className='border-b border-gray-600'></div>
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between py-4 md:h-24 gap-3 md:gap-0'>
                            <div className='flex-1'>
                                <p className='text-base md:text-lg font-medium hover:underline hover:decoration-cyan-500 hover:decoration-2 transition-all'>{content?.subject}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="hover:text-cyan-400 transition-colors cursor-pointer">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                        </div>
                        <div className='border-b border-gray-600'></div>
                        <div className='mt-8 md:mt-12 space-y-4 text-gray-200 leading-relaxed'>
                            <p className='text-base md:text-lg'>Hi {email.recipentName},</p>
                            <p className='text-base md:text-lg'>{content.intro}</p>
                            <p className='text-base md:text-lg'>{content.body}</p>
                            <p className='text-base md:text-lg'>{content.closing}</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ResultPage