import React from 'react'
import Link from 'next/link'
import CampaignTable from './CampaignTable'

const WebsiteDashboard = ( { used, max, plan, campaign, emailsGenerated, email, emailData } ) => {
    return (
        <>
            <main className='min-h-screen ml-0 md:ml-[17.5vw] px-4 md:px-0'>
                <section className='campaigns mx-auto md:mx-[15vw] mb-28 min-h-[45vh] max-w-7xl'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                        <div>
                            <h1 className='text-2xl md:text-3xl font-bold mt-8 animate-fade-in'>Your campaigns</h1>
                            <span className='text-sm md:text-[16px] text-gray-400'>Manage and track your AI-powered email campaigns</span>
                        </div>
                        {
                            used < max ? (
                                <Link href='/dashboard/generate/website-pro' className='mt-4 md:mt-8'>
                                    <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all hover:scale-105 animate-fade-in-up'>
                                        Generate New Email
                                    </button>
                                </Link>
                            ) : (
                                <Link href='/pricing' className='mt-4 md:mt-8'>
                                    <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all hover:scale-105 animate-fade-in-up'>
                                        Upgrade your plan
                                    </button>
                                </Link>
                            )}
                    </div>
                    {/* Plan & Usage bar */}
                    <div className='w-full md:w-[80vw] my-6'>
                        {(() => {
                            const pct = Math.min(100, Math.round((used / max) * 100))
                            return (
                                <div className='bg-[#08121A] rounded-2xl p-4 shadow-inner border border-gray-800'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h3 className='text-lg font-semibold text-gray-100'>Plan & Usage</h3>
                                            <p className='text-sm text-gray-400'>Usage this month</p>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <span className='text-sm text-gray-300'>{used}/{max} generations</span>
                                            <span className='bg-[#0f2b34] text-cyan-300 text-sm px-3 py-1 rounded-full border border-cyan-800'>{plan}</span>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <div className='w-full h-2 bg-[#0b1b22] rounded-full overflow-hidden'>
                                            <div className='h-2 bg-cyan-400 transition-all' style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })()}
                    </div>
                    <div className='border-[0.5px] border-gray-500 my-6 w-full md:w-[80vw] rounded-2xl overflow-x-auto'>
                        <CampaignTable campaigns={campaign} emailGenerated={emailsGenerated} />
                    </div>
                </section>
                <section className='mx-auto md:mx-[15vw] flex flex-col md:flex-row gap-4 md:gap-8 justify-between min-h-[60vh] md:h-[60vh] w-full md:w-[80vw] mt-8 md:mt-28 max-w-7xl'>
                    <div className='border rounded-2xl p-4 md:p-6 w-full h-full bg-gray-900 border-gray-800 flex flex-col animate-fade-in-up'>
                        <h1 className='text-2xl md:text-3xl font-bold'> AI Insights</h1>
                        <div className='flex items-center justify-center flex-1'>
                            <h1 className='text-3xl md:text-5xl text-center'> Coming Soon...</h1>
                        </div>
                    </div>
                    <div className='border rounded-2xl p-4 md:p-6 w-full h-full bg-gray-900 border-gray-800 animate-fade-in-up' style={{animationDelay: '0.1s'}}>
                        <h1 className='text-3xl mb-6 font-bold'>
                            Recent Activity
                        </h1>
                        {/* scrollable list area */}
                        <div className='flex-1 overflow-auto pr-2'>
                            {email.map((content, index) => {
                                const meta = emailData[index] // matching metadata
                                if (!meta) return null

                                return (
                                    <div key={meta.id} className="mb-4 border-b border-gray-700 pb-4">
                                        <div className='flex gap-2 items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">

                                                <circle cx="12" cy="12" r="12" fill="#22D3EE" />

                                                <path d="M5 8h14v8H5V8zm0 0l7 5 7-5" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>
                                                <p className="text-[15px] font-extralight">{meta.recipentName}</p>
                                                <p className='text-[12px] text-gray-400'>{meta.companyName}</p>
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            Sent on: {new Date(meta.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='mt-4'>
                            <Link href='/dashboard/activity'>
                                <button className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md w-full'>
                                    View All Activity
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default WebsiteDashboard