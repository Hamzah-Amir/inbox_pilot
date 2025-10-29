'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { getCampaign } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { set, useForm } from 'react-hook-form'

const EmailGenerationPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: session, status } = useSession();
    const [campaigns, setCampaigns] = useState([])
    const [loading, setloading] = useState(false)
    const [email, setEmail] = useState()
    const router = useRouter()

    const getCampaignData = async () => {
        const campaignData = await getCampaign(session.user.id)
        console.log(campaignData)
        const mapped = campaignData.map(c => ({
            id: c.id,
            title: c.title,
            goal: c.goal,
        }))
        setCampaigns(mapped)
    }

    useEffect(() => {
        if (session?.user?.id) {
            getCampaignData()
        }

    }, [session])

    const onSubmit = async (data) => {
        setloading(true)
        const a = await fetch("/api/personalize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                campaignId: data.campaignId,
                recipentEmail: data.recipentEmail,
                companyName: data.companyName,
                recipentName: data.recipentName,
                tone: data.tone,
                productDescription: data.productDescription
            })
        })

        const res = await a.json()
        const id = res.recieved
        router.push(`/dashboard/generate/result/${id}`)
    }

    return (
        <>
            <main className='min-h-screen mx-[17.5vw] mt-8'>
                <Sidebar />
                <section>
                    <h1 className='text-4xl'>Generate AI Emails</h1>
                    <p className='text-gray-300 mt-2'>Create personalized emails for your selected campaign.</p>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className='my-6 w-[60vw] min-h-[90vh] mx-[12vw] border flex flex-col  border-[#030b1b] size-full p-6 rounded-[14px] shadow-[#030b1b] shadow-2xl bg-[#0B1624] '>
                        <h3 className='text-lg'>Email Configuration</h3>
                        <p className='text-sm text-gray-400 mb-8'>Set your preferences and let AI craft the perfect email.</p>

                        <label htmlFor='campaignId' className='block mb-2'>Select Campaign</label>
                        <select className='border w-full mb-6 rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                            id='campaignId'
                            {...register("campaignId", { required: true })}
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

                        <label htmlFor='companyName' className='block mb-2'>Enter Campany Name <span className='text-red-500'>*</span></label>
                        <input className='border w-full mb-6 rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                            placeholder='Enter Campany Name'
                            id='companyName'
                            {...register("companyName", { required: true })}
                        />

                        <label htmlFor='recipentName' className='block mb-2'>Enter Recipent Name <span className='text-red-500'>*</span></label>
                        <input className='border w-full mb-6 rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                            placeholder='Enter Recipent Name'
                            id='recipentName'
                            {...register("recipentName", { required: false })}
                        />


                        <label htmlFor='tone' className='block mb-2'>Select Tone <span className='text-red-500'>*</span></label>
                        <select className='border w-full mb-6 rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                            id='tone'
                            {...register("tone", { required: true })}
                        >
                            <option value="Persuasive & Witty">Inbox Pilot's default</option>
                            <option value="Persuasive & Confident">B2B Special</option>
                            <option value="Professional">Professional</option>
                            <option value="Persuasive">Persuasive</option>
                            <option value="Friendly">Friendly</option>
                            <option value="Confident">Confident</option>
                            <option value="Witty">Witty</option>
                            <option value="Data-Driven">Data-Driven</option>
                        </select>

                        <label htmlFor='productDescription' className='block mb-2'>
                            Enter Product Description <p className="text-gray-400 text-sm mb-2">
                                (Optional, but helps generate more personalized emails)
                            </p>
                        </label>

                        <textarea
                            className='border w-full mb-6 rounded-lg p-2 h-28 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none resize-none'
                            placeholder='Enter Product Description'
                            id='productDescription'
                            {...register("productDescription", { required: false })}
                        />

                        <button className=" border mt-6 border-cyan-600 cursor-pointer rounded-lg p-2 px-6 font-bold bg-cyan-500"
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 justify-center items-center relative left-[25vw] w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            ) : (
                                "Generate Email"
                            )}
                            
                        </button>
                    </form>
                </section>
            </main>
        </>
    )

}
export default EmailGenerationPage