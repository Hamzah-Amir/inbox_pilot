'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getUser } from '@/actions/useractions'

const Navbar = () => {

  const { data: session } = useSession();
  const [generated, setGenerated] = useState(null)

  const fetchUser = async () => {
    const user = await getUser(session.user.email)
    const emailGenerated = user.emailsGenerated
    console.log("User", user)
    console.log(`${emailGenerated} emails has been generated`)
    setGenerated(emailGenerated)
    return user
  }

  useEffect(() => {
    if (!session) return
    if(session) {
      fetchUser()
    }
  }, [session])

  if (!session) {


    return (
      <header className='fixed top-0 left-0 right-0 z-50 bg-[#071021] border-b border-gray-700 text-white animate-fade-in-down'>
        <nav className='flex px-4 md:px-10 justify-between items-center p-3 md:p-4'>
          <div className='flex justify-center items-center gap-2 md:gap-5'>
            <div className='img'><Image src='/fav.png' height='40' width='40' className='md:h-[50px] md:w-[50px]' alt='Inbox Pilot Logo'></Image></div>
            <div className='logo font-bold text-xl md:text-3xl'>Inbox Pilot</div>
          </div>

          <ul className='hidden md:flex gap-4 font-semibold'>
            <Link href="/"><li className='hover:text-cyan-400 transition-colors'>Home</li></Link>
            <Link href="/pricing"><li className='hover:text-cyan-400 transition-colors'>Pricing</li></Link>
            <Link href="/blog"><li className='hover:text-cyan-400 transition-colors'>About</li></Link>
          </ul>

          <ul className='flex items-center gap-2 md:gap-5'>
            <button className='border-2 border-cyan-400 font-bold w-20 md:w-28 h-9 md:h-12 rounded-lg text-xs md:text-base hover:bg-cyan-400/10 transition-all'>
              <Link href="/login"><li>Sign In</li></Link>
            </button>

            <button className='border-2 border-cyan-600 w-24 md:w-32 h-9 md:h-12 rounded-lg font-bold bg-cyan-600 hover:bg-cyan-500 transition-all text-xs md:text-base'>
              <Link href="/dashboard"><li>Get Started</li></Link>
            </button>
          </ul>
        </nav>
      </header>
    )
  }

  if (session && session.user) {
    return (
      <header className='fixed top-0 left-0 right-0 z-50 bg-[#071021] border-b border-gray-700 text-white animate-fade-in-down'>
        <nav className='flex px-4 md:px-10 justify-between items-center p-4 md:p-6'>
          <div className='flex justify-center items-center gap-2 md:gap-5'>
            <div className='img'><Image src='/fav.png' height='35' width='35' className='md:h-[40px] md:w-[40px]' alt='Inbox Pilot Logo'></Image></div>
            <div className='logo font-bold text-lg md:text-2xl'>Inbox Pilot</div>
          </div>

          <ul className='hidden md:flex gap-4 font-semibold'>
            <Link href="/"><li className='hover:text-cyan-400 transition-colors'>Home</li></Link>
            <Link href="/pricing"><li className='hover:text-cyan-400 transition-colors'>Pricing</li></Link>
            <Link href="/blog"><li className='hover:text-cyan-400 transition-colors'>About</li></Link>
          </ul>

          <div className='flex items-center gap-2 md:gap-4'>
            <div className='hidden md:flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md border border-gray-700 text-sm'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="6" width="20" height="12" rx="2" ry="2" strokeWidth="1.5" />
                <path d="M8 10h.01" strokeWidth="1.5" />
              </svg>
              <span>{generated ?? '0'} Emails Generated</span>
            </div>

            <Link href="/dashboard">
              <button className='bg-cyan-500 hover:bg-cyan-400 text-black px-4 md:px-8 py-2 rounded-md flex items-center gap-2 text-sm md:text-base transition-all hover:scale-105'>
                <span className='hidden md:inline'>Dashboard</span>
                <span className='md:hidden'>Dash</span>
              </button>
            </Link>

            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-cyan-500'>
              <Image src={session.user.image ?? '/fav.png'} alt='avatar' width={40} height={40} />
            </div>
          </div>
        </nav>
      </header>
    )
  }

}

export default Navbar