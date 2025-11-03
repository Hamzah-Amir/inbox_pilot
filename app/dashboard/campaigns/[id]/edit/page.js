'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

const CampaignEditPage = ({ params }) => {
  const id = params.id
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', goal: '', status: 'ACTIVE', startDate: '', endDate: '' })
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch(`/api/campaigns/${id}`)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        setForm({
          title: data.title || '',
          goal: data.goal || '',
          status: data.status || 'ACTIVE',
          startDate: data.startDate ? new Date(data.startDate).toISOString().slice(0, 10) : '',
          endDate: data.endDate ? new Date(data.endDate).toISOString().slice(0, 10) : '',
        })
      } catch (err) {
        console.error(err)
        setError('Unable to load campaign')
      } finally {
        setLoading(false)
      }
    }
    fetchCampaign()
  }, [id])

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          goal: form.goal,
          status: form.status,
          startDate: form.startDate || null,
          endDate: form.endDate || null,
        }),
      })
      if (!res.ok) throw new Error('Update failed')
      router.push('/dashboard/campaigns')
    } catch (err) {
      console.error(err)
      setError('Update failed')
    }
  }

  if (loading) return <div className='p-6'>Loading...</div>

  return (
    <main className='min-h-screen mx-[17.5vw]'>
        <Sidebar />
      <div className='mt-8'>
        <h1 className='text-2xl font-bold'>Edit Campaign</h1>
      </div>
      {error && <p className='text-red-400 mt-4'>{error}</p>}
      <form className='mt-6 w-[45vw] bg-[#0B1624] p-6 rounded-lg border border-gray-700' onSubmit={handleSubmit}>
        <label className='block text-sm mb-1'>Campaign Title</label>
        <input name='title' value={form.title} onChange={handleChange} className='w-full p-2 rounded-md mb-4 bg-transparent border border-gray-600' />

        <label className='block text-sm mb-1'>Goal</label>
        <input name='goal' value={form.goal} onChange={handleChange} className='w-full p-2 rounded-md mb-4 bg-transparent border border-gray-600' />

        <label className='block text-sm mb-1'>Status</label>
        <select name='status' value={form.status} onChange={handleChange} className='w-full p-2 rounded-md mb-4 bg-transparent border border-gray-600'>
          <option value='ACTIVE'>ACTIVE</option>
          <option value='PAUSED'>PAUSED</option>
          <option value='COMPLETED'>COMPLETED</option>
        </select>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='block text-sm mb-1'>Start Date</label>
            <input type='date' name='startDate' value={form.startDate} onChange={handleChange} className='w-full p-2 rounded-md bg-transparent border border-gray-600' />
          </div>
          <div className='flex-1'>
            <label className='block text-sm mb-1'>End Date</label>
            <input type='date' name='endDate' value={form.endDate} onChange={handleChange} className='w-full p-2 rounded-md bg-transparent border border-gray-600' />
          </div>
        </div>

        <div className='mt-6 flex gap-3'>
          <button type='submit' className='bg-cyan-500 px-4 py-2 rounded-md'>Save changes</button>
          <button type='button' onClick={() => router.push('/dashboard/campaigns')} className='border px-4 py-2 rounded-md'>Cancel</button>
        </div>
      </form>
    </main>
  )
}

export default CampaignEditPage