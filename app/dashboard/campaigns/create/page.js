'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createCampaign } from '@/actions/useractions'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const createCampaignPage = () => {

    const {data: session, status}  = useSession()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },

    } = useForm();

    const onSubmit = async (data) => {
        await createCampaign(session.user.id, data)
        alert("Campaign Created Successfully!")
        router.push('/dashboard/campaigns')
    }

    return (
        <>
            <main className='min-h-screen ml-0 md:ml-[17.5vw] mt-20 md:mt-0 px-4 md:px-0'>
                <Sidebar />
                <section className='heading max-w-7xl mx-auto' >
                    <div>
                        <h1 className='text-2xl md:text-[28px] font-bold mt-8 md:mt-10 animate-fade-in'>Create New Campaign</h1>
                        <p className='text-gray-300 text-sm md:text-[16px] mt-1'> Set up your campaign details before generating personalized emails.</p>
                    </div>
                </section>
                <section className='my-6 w-full md:w-[45vw] md:mx-[17vw] min-h-[80vh] max-w-2xl mx-auto'>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className='border flex flex-col border-[#030b1b] size-full p-4 md:p-6 rounded-[14px] shadow-[#030b1b] shadow-2xl bg-[#0B1624] animate-fade-in-up'>
                        <h1 className='text-xl md:text-2xl font-bold'>Campaign Details</h1>
                        <div className='border-[0.5px] border-gray-700 mx-2.5 my-6 md:my-8'></div>
                        <div className='mb-4'>
                            <label htmlFor='campaignTitle' className='block text-gray-300 mb-2 text-sm md:text-base'>Campaign Name <span className='text-red-500'>*</span></label>
                            <input className='border border-gray-700 bg-[#0D1A2B] text-white w-full rounded-lg p-2.5 md:p-3 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all'
                                placeholder='e.g., SaaS Outreach'
                                id='campaignTitle'
                                {...register("campaignTitle", { required: true })}  
                            />
                            {errors.campaignTitle && <p className="text-sm text-red-500 mt-1">Campaign title is required!</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='goal' className='block mb-2 text-sm md:text-base'>Goal <span className='text-red-500'>*</span></label>
                            <input className='border border-gray-700 bg-[#0D1A2B] text-white w-full rounded-lg p-2.5 md:p-3 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all'
                                placeholder='define your goal'
                                id='goal'
                                {...register("goal", { required: true })}
                            />
                            {errors.goal && <p className="text-sm text-red-500 mt-1">Goal is required!</p>}
                        </div>
                        <div className='flex flex-col md:flex-row md:justify-between gap-4 mb-4'>
                            <div className='flex-1'>
                                <label htmlFor='startDate' className='block mb-2 text-sm md:text-base'>Start Date <span className='text-red-500'>*</span></label>
                                <input className='border border-gray-700 bg-[#0D1A2B] text-white mt-2 w-full rounded-lg p-2.5 md:p-3 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all'
                                    type='date'
                                    id='startDate'
                                    {...register("startDate", { required: true })}
                                />
                            </div>
                            <div className='flex-1'>
                                <label htmlFor='endDate' className='block mb-2 text-sm md:text-base'>End Date (optional)</label>
                                <input className='border border-gray-700 bg-[#0D1A2B] text-white mt-2 w-full rounded-lg p-2.5 md:p-3 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all'
                                    type='date'
                                    id='endDate'
                                    {...register("endDate", { required: false })}
                                />
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='status' className='block mb-2 text-sm md:text-base'>Status <span className='text-red-500'>*</span></label>
                            <select className='border border-gray-700 bg-[#0D1A2B] text-white w-full rounded-lg p-2.5 md:p-3 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all'
                                id='status'
                                {...register("status", { required: true })}
                            >
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="PAUSED">PAUSED</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>
                            {errors.status && <p className="text-sm text-red-500 mt-1">Status is required!</p>}
                        </div>
                        <button className="border mt-6 border-cyan-600 cursor-pointer rounded-lg p-3 px-6 font-bold bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
                            type='submit'
                        >
                            Create Campaign
                        </button>
                    </form>
                </section>
            </main>
        </>
    )
}

export default createCampaignPage