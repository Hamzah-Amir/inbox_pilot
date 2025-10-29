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
      let data = { id: c.id, title: title, emailSent: emailsSent, replies: replies, conversionRate: conversionRate, status: status }
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
        <section className='campaigns mx-[17.5vw] min-h-[30vh]'>
          <div className=' '>
            <h1 className='text-4xl font-bold mt-8'>Your campaigns</h1>
            <span className='text-[16px] text-gray-400'>Manage and track your AI-powered email campaigns</span>
          </div>
          <div>
            <CampaignTable campaigns={campaign} />
          </div>
        </section>
      </main>
    </>
  )
}

export default page