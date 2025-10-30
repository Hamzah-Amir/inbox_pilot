'use client'
import { fetchRecentEmails } from '@/actions/useractions'
import CampaignTable from '@/components/CampaignTable'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { getUser } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import React from 'react'

const page = () => {

  const [campaign, setCampaign] = useState([])
  const [email, setEmail] = useState([])
  const [emailData, setEmailData] = useState([])
  const [emailsGenerated, setEmailsGenerated] = useState(null)
  const { data: session } = useSession()

  const fetchEmailGenerated = async () =>{
      const user = await getUser(session.user.email)
      const emailGenerated = user.emailsGenerated   
      setEmailsGenerated(emailGenerated)
      return emailGenerated     
  }

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

  const fetchRecentEmailData = async () => {
    const res = await fetch("/api/emails/recent", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await res.json()
    const content = data.content
    const emailData = data.recentEmails
    console.log(emailData)
    setEmail(content)
    setEmailData(emailData)
  }
  useEffect(() => {
    if (session) {
      fetchCampaignData()
      fetchRecentEmailData()
      fetchEmailGenerated()
    }
  }, [session])


  return (
    <>
      <main className='min-h-screen'>
        <Sidebar />
        <section className='campaigns mx-[17.5vw] mb-28 h-[45vh]'>
          <div className=' '>
            <h1 className='text-3xl font-bold mt-8'>Your campaigns</h1>
            <span className='text-[16px] text-gray-400'>Manage and track your AI-powered email campaigns</span>
            <Link href='/dashboard/generate'>
              <button className='bg-blue-600 bottom-16 left-56 relative hover:bg-blue-700 text-white px-4 py-2 rounded-md float-right mt-8 mr-4'>
                Generate New Email
              </button>
            </Link>
          </div>
          <div className='border-[0.5px] border-gray-500 my-6 h-full w-[80vw] rounded-2xl'>
            <CampaignTable campaigns={campaign} emailGenerated={emailsGenerated}/>
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
            <h1 className='text-3xl mb-6 font-bold'>
              Recent Activity
            </h1>
            {/* assign email from use state using usestate */}
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
                    <p className="text-[15px] font-extralight">{meta.recipentEmail}</p>
                    <p className='text-[12px] text-gray-400'>{content.subject}</p>
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Sent on: {new Date(meta.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )
            })}
            <div className='top-32 relative'>
            <Link href='/dashboard/activity'>
              <button className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md mt-4 w-full'>
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

export default page