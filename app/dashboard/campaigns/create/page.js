'use client'

import Sidebar from '@/components/Sidebar'
import React from 'react'
import { useForm } from 'react-hook-form'

const createCampaign = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },

    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <main className='min-h-screen mx-[17.5vw]'>
                <Sidebar />
                <section className='heading' >
                    <div>
                        <h1 className='text-[28px] font-bold mt-10'>Create New Campaign</h1>
                        <p className='text-gray-300 text-[16px] mt-1'> Set up your campaign details before generating personalized emails.</p>
                    </div>
                </section>
                <section className='my-6 w-[45vw] h-[70vh] mx-[17vw] '>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className='border flex flex-col  border-[#030b1b] size-full p-6 rounded-[14px] shadow-[#030b1b] shadow-2xl bg-[#0B1624]'>
                        <h1 className='text-2xl font-bold'>Campaign Details</h1>
                        <div className='border-[0.5px] border-gray-700 mx-2.5 my-8'></div>
                        <div className='mb-4'>
                            <label htmlFor='campaignTitle' className='block text-gray-300 mb-2'>Campaign Name <span className='text-red-500'>*</span></label>
                            <input className='border w-full rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                                placeholder='e.g., SaaS Outreach'
                                id='campaignTitle'
                                {...register("campaignTitle", { required: true })}
                            />
                            {errors.campaignTitle && <p className="text-sm text-red-500 mt-1">Campaign title is required!</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='goal' className=' block mb-2'>Goal <span className='text-red-500'>*</span></label>
                            <input className='border w-full rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                                placeholder='define your goal'
                                id='goal'
                                {...register("goal", { required: true })}
                            />
                            {errors.goal && <p className="text-sm text-red-500 mt-1">Goal is required!</p>}
                        </div>
                        <div className=' flex justify-between mb-4'>
                            <div>
                                <label htmlFor='startDate'>Start Date <span className='text-red-500'>*</span></label>
                                <input className='border mt-2 w-full rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                                    type='date'
                                    id='startDate'
                                    {...register("startDate", { required: true })}
                                />
                            </div>
                            <div>
                                <label htmlFor='endDate'>End Date (optional)</label>
                                <input className='border mt-2 w-full rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                                    type='date'
                                    id='endDate'
                                    {...register("endDate", { required: false })}
                                />
                            </div>
                        </div>
                        <button className=" border mt-6 border-cyan-600 cursor-pointer rounded-lg p-2 px-6 font-bold bg-cyan-500"
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

export default createCampaign