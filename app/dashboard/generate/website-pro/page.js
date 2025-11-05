'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import Sidebar from '@/components/Sidebar';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getCampaign } from '@/actions/useractions';
import { useRouter } from 'next/navigation'
import { Router } from 'next/router';

const WebsiteProPersonalization = () => {

  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data: session } = useSession()
  const [campaigns, setCampaigns] = useState([])
  const [emailType, setEmailType] = useState()
  const [geminiResponse, setGeminiResponse] = useState('')
  const [loading, setloading] = useState(false)

  const getCampaignData = async () => {
    const campaignData = await getCampaign(session.user.id)
    const mapped = campaignData.map(c => ({
      id: c.id,
      title: c.title,
      goal: c.goal,
    }))
    setCampaigns(mapped)
  }

  const scrapeWebsite = async (domain) => {
    const res = await fetch("/api/personalize/website-pro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: domain })
    });
    const data = await res.json();
    console.log(data.pageText)
  };

  useEffect(() => {
    if (session?.user?.id) {
      getCampaignData()
    }

  }, [session])

  const onSubmit = async (data) => {
    setloading(true)
    setGeminiResponse("")
    try {

      const response = await fetch("/api/personalize/website-pro", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          campaignID: data.campaignID,
          website: data.website,
          recipientName: data.recipientName,
          recipientRole: data.recipientRole,
          yourName: data.yourName,
          emailType: data.emailType
        })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      router.push("/dashboard/generate/website-pro/#output")
      console.log("Streaming starts!")
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        setGeminiResponse((prev) => prev + chunk);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    };
  };


  return (
    <>
      <main className='min-h-screen mx-[17.5vw] mt-8'>
        <Sidebar />
        <section>
          <h1 className='text-4xl'>Generate AI Emails</h1>
          <p className='text-gray-300 mt-2'>Create personalized emails for your selected campaign.</p>
          <form className='my-6 w-[60vw] min-h-[70vh] mx-[12vw] border flex flex-col space-y-4 max-w-xlborder-[#030b1b] size-full p-6 rounded-[14px] shadow-[#030b1b] shadow-2xl bg-[#0B1624] '
            onSubmit={handleSubmit(onSubmit)} >

            <div>
              <label htmlFor='campaignId' className='block mb-2'>Select Campaign</label>
              <select className='border w-full mb-0.5 rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                id='campaignId'
                {...register("campaignId", { required: true })}
              >
                {campaigns && campaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.title} ({c.goal})</option>
                ))}
              </select>

            </div>

            {/* Website URL */}
            <div>
              <label className="block mb-1 font-medium">Website URL</label>
              <input
                {...register("website", { required: true })}
                type="url"
                placeholder="https://example.com"
                className="w-full border p-2 rounded"
              />
              {errors.website && <p className="text-red-500 text-sm">Website is required</p>}
            </div>

            {/* Recipient Name */}
            <div>
              <label className="block mb-1 font-medium">Recipient Name</label>
              <input
                {...register("recipientName", { required: true })}
                type="text"
                placeholder="John Doe"
                className="w-full border p-2 rounded"
              />
              {errors.recipientName && <p className="text-red-500 text-sm">Recipient name is required</p>}
            </div>

            {/* Recipient Role */}
            <div>
              <label className="block mb-1 font-medium">Recipient Role</label>
              <input
                {...register("recipientRole")}
                type="text"
                placeholder="Founder, Marketing Manager, etc."
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Your Name */}
            <div>
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                {...register("yourName", { required: true })}
                type="text"
                placeholder="Hamza / Your Name"
                className="w-full border p-2 rounded"
              />
              {errors.yourName && <p className="text-red-500 text-sm">Your name is required</p>}
            </div>

            {/* Email Type Selector (useState handled) */}
            <div>
              <label className="block mb-1 font-medium">Type of Email</label>
              <select
                {...register("emailType", { required: true })}
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="cold Outreach">Cold Outreach</option>
                <option value="followup">Follow-up</option>
                <option value="inquiry">Information Inquiry</option>
                <option value="value">Value Add Message</option>
              </select>
              {errors.emailType && <p className="text-red-500 text-sm">Your name is required</p>}
            </div>

            {/* Custom Instructions */}
            <div>
              <label className="block mb-1 font-medium">Extra Instructions (Optional)</label>
              <textarea
                {...register("instructions")}
                placeholder="Any tone, angle or personalization notes..."
                className="w-full border p-2 rounded h-28"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              {loading ? 'Generating...' : 'Generate Email'}
            </button>
          </form>
        </section>
        <section className='my-6 w-[60vw] min-h-[70vh] mx-[12vw] border flex flex-col space-y-4 max-w-xl border-[#030b1b] p-6 rounded-[14px] shadow-[#030b1b] shadow-2xl bg-[#0B1624]' id='output'>
          <h1 className='text-4xl'>Email</h1>
          <div className='w-full min-h-[300px] p-4 border rounded bg-[#0D1A2B] text-white whitespace-pre-wrap'>
            {loading && !geminiResponse
              ? Array(7).fill("").map((_, i) => (
                <div key={i} className="h-4 bg-gray-700 my-1 rounded animate-pulse"></div>
              ))
              : geminiResponse
            }
          </div>
        </section>

      </main>
    </>
  )
}

export default WebsiteProPersonalization