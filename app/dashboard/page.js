'use client'
import CampaignTable from '@/components/CampaignTable'
import Sidebar from '@/components/Sidebar'
import { useState, useEffect } from 'react'
import React from 'react'

const page = () => {

  const [campaign, setCampaign] = useState([])

  const fetchCampaignData = async () => {
    const campaignData = await fetch("/api/dashboard/campaigns", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })

    let res = await campaignData.json()
    console.log(res)
    let content = res.map(c => {
      const id = c.id;
      const title = c.title;
      const emailsSent = c.emailSent;
      const replies = c.replies
      const conversionRate = c.conversionRate;
      const status = c.status
      let data = { id: id, title: title, emailSent: emailsSent, replies: replies, conversionRate: conversionRate, status: status }
      return data
    })
    setCampaign(content)
  }
  useEffect(() => {
    fetchCampaignData()
  }, [])


  return (
    <>
      <main className='min-h-screen'>
        <Sidebar />
        <section className='campaigns mx-[17.5vw] mb-28 h-[45vh]'>
          <div className=' '>
            <h1 className='text-3xl font-bold mt-8'>Your campaigns</h1>
            <span className='text-[16px] text-gray-400'>Manage and track your AI-powered email campaigns</span>
          </div>
          <div className='border-[0.5px] border-gray-500 my-6 h-full w-[80vw] rounded-2xl'>
            <CampaignTable campaigns={campaign} />
          </div>
        </section>
        <section className='mx-[17.5vw] flex gap-8 justify-between h-[60vh] w-[80vw]'>
          <div className='border rounded-2xl p-6 w-full h-full bg-gray-900 border-gray-800'>
            <h1 className='text-3xl font-bold'> AI Insights</h1>
            <div className='flex items-center justify-center'>
            <h1 className='text-5xl text-center mt-[25vh] '> Coming Soon...</h1>
            </div>
          </div>
          <div className='border rounded-2xl p-6 w-full h-full bg-gray-900 border-gray-800'>
            <h1 className='text-3xl font-bold'>
              Recent Activity
            </h1>
          </div>
        </section>
      </main>
    </>
  )
}

export default page