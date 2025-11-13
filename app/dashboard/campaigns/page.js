'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { deleteCampaign, getCampaign } from '@/actions/useractions'

const page = () => {

    const { data: session, status } = useSession()
    const [campaigns, setCampaigns] = useState([])

    const fetchCampaigns = async () => {
        const data = await getCampaign(session.user.id)
        const campaignData = data.map(c => {
            const replies = c.emails.reduce((acc, e) => acc + e.replies.length, 0);
            const emailSent = c.emailsSent;
            const title = c.title;
            const status = c.status;
            const goal = c.goal;
            const startDate = c.startDate
            const endDate = c.endDate
            return {
                id: c.id,
                title: title,
                replies: replies,
                emailSent: emailSent,
                status: status,
                goal: goal,
                startDate: startDate,
                endDate: endDate,
            }
        })
        setCampaigns(campaignData)
        return campaignData
    }

    useEffect(() => {
        if (status == 'authenticated') {
            fetchCampaigns()
        }
    }, [session, status])

    // Write a function to edit campaign details..
    const router = useRouter()

    const handleEdit = async (campaignId) => {
        // navigate to the campaign edit page where the form to edit details exists
        // keep this function simple: push to the edit route with the campaign id
        if (!campaignId) return
        try {
            router.push(`/dashboard/campaigns/${campaignId}/edit`)
        } catch (err) {
            console.error('Failed to navigate to edit page', err)
        }
    }

    const handleDelete = async (id) => {
        console.log("Deleting campaign ID:", id);
        await deleteCampaign(id)
    }


    return (
        <>
            <main className='min-h-screen mx-[16vw]'>
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
                                {campaigns && campaigns.map((c) => (
                                    <tr
                                        key={c.id}
                                        className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                                    >
                                        <td className="py-3 px-4 font-medium text-white">{c.title}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${c.status === "ACTIVE"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : c.status === "PAUSED"
                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                        : "bg-gray-600/20 text-gray-400"
                                                    }`}
                                            >
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">{c.goal}</td>
                                        <td className="py-3 px-4">{c.emailSent}</td>
                                        <td className="py-3 px-4">{c.startDate.toLocaleDateString()}</td>
                                        <td className='py-3 px-4'>{c.endDate ? c.endDate.toLocaleDateString() : "Not specified"}</td>
                                        <td className="py-4 px-4 space-x-2">
                                            <button onClick={() => handleEdit(c.id)} className="edit hover:text-cyan-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg></button>
                                            <button className="hover:text-cyan-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg></button>
                                            <button className="hover:text-cyan-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg></button>
                                            <button onClick={() => handleDelete(c.id)} className="hover:text-cyan-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    )
}

export default page