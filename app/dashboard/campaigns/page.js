'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { getCampaign } from '@/actions/useractions'

const page = () => {

    const {data: session, status} = useSession()

    useEffect(() => {
        if(status == 'authenticated') {
            getCampaign(session.user.id)
        }
    }, [session, status])
    

    return (
        <>
            <main className='min-h-screen mx-[17.5vw]'>
                <Sidebar />
                <section >
                    <div>
                        <h1 className='text-4xl mt-8'>
                            Manage Campaigns
                        </h1>
                        <p className='text-gray-300 mt-2 text-lg'>
                            Create, track, and optimize your email campaigns
                        </p>
                    </div>
                    <div className='left-[67vw] mt-4 relative'>
                        <Link href='/dashboard/campaigns/create'>
                            <button className='bg-cyan-500 cursor-pointer text-black px-8 p-2 rounded-xl'>
                                + New campaign
                            </button>
                        </Link>
                    </div>
                    <div className='mt-10 w-[80vw] border border-gray-700 rounded-xl'>
                        <table className='w-[80vw] text-left'>
                            <thead>
                                <tr className="border-b border-gray-700 rounded-md text-gray-400">
                                    <th className="py-4 px-4">Campaign Name</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4">Goal</th>
                                    <th className="py-4 px-4">Emails Sent</th>
                                    <th className="py-4 px-4">Start Date</th>
                                    <th className="py-4 px-4">End Date</th>
                                    <th className="py-4 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-800">
                                    <td className="py-4 px-4">Q4 Product Launch</td>
                                    <td className="py-4 px-4"><span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full">Active</span></td>
                                    <td className="py-4 px-4">Promote Product</td>
                                    <td className="py-4 px-4">1,230</td>
                                    <td className="py-4 px-4">Sep 30, 2025</td>
                                    <td className="py-4 px-4">Dec 30, 2025</td>
                                    <td className="py-4 px-4 space-x-2">
                                        <button className="hover:text-cyan-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg></button>
                                        <button className="hover:text-cyan-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg></button>
                                        <button className="hover:text-cyan-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg></button>
                                        <button className="hover:text-cyan-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    )
}

export default page