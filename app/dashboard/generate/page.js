'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { getCampaign } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'

const EmailGenerationPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: session, status } = useSession();
    const [campaigns, setCampaigns] = useState([])

    const getCampaignData = async () => {
        const campaignData = await getCampaign(session.user.id)
        console.log(campaignData)
        const mapped = campaignData.map(c => ({
            id: c.id,
            title: c.title,
            goal: c.goal,
        }))
        console.log("Mapped campaigns:", mapped);
        setCampaigns(mapped)
    }

    useEffect(() => {
        if (session?.user?.id) {
            getCampaignData()
        }

    }, [session])

    const onSubmit = async (data) => {
        console.log(data)
    }


    return (
        <>
            <main className='min-h-screen mx-[17.5vw] mt-8'>
                <Sidebar />
                <section>
                    <h1 className='text-4xl'>Generate AI Emails</h1>
                    <p className='text-gray-300 mt-2'>Create personalized emails for your selected campaign.</p>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className='my-6 w-[60vw] h-[60vh] mx-[12vw] border flex flex-col  border-[#030b1b] size-full p-6 rounded-[14px] shadow-[#030b1b] shadow-2xl bg-[#0B1624] '>
                        <h3 className='text-lg'>Email Configuration</h3>
                        <p className='text-sm text-gray-400 mb-8'>Set your preferences and let AI craft the perfect email.</p>

                        <label htmlFor='campaign' className='block mb-2'>Select Campaign</label>
                        <select className='border w-full mb-6 rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                            id='status'
                            {...register("campaigns", { required: true })}
                        >
                            {campaigns && campaigns.map(c => (
                                <option key={c.id} value={c.id}>{c.title} ({c.goal})</option>
                            ))}
                        </select>

                        <label htmlFor='recipentEmail' className='block mb-2'>Recipent Email <span className='text-red-500'>*</span></label>
                        <input className='border w-full mb-6 rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                            placeholder='Enter Recipent Email'
                            id='recipentEmail'
                            {...register("recipentEmail", { required: true })}
                        />
                        {errors.recipentEmail && <p className="text-sm text-red-500 mt-1">Recipent Email is required!</p>}

                        <label htmlFor='tone' className='block mb-2'>Select Campaign</label>
                        <select className='border w-full rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                            id='tone'
                            {...register("tone", { required: true })}
                        >
                            <option value="Professional">Professional</option>
                            <option value="Persuasive">Persuasive</option>
                            <option value="Friendly">Friendly</option>
                            <option value="Confident">Confident</option>
                            <option value="Witty">Witty</option>
                            <option value="Data-Driven">Data-Driven</option>
                        </select>

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
export default EmailGenerationPage