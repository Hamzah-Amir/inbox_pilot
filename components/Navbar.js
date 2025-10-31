'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const Navbar = () => {

  const { data: session } = useSession();


  if (!session) {


    return (
      <header className='fixed top-0 left-0 right-0 z-50 bg-[#071021] border-b border-gray-700 text-white'>
        <nav className='flex px-10 justify-between items-center p-4'>
          <div className='flex justify-center items-center gap-5'>
            <div className='img'><Image src='/fav.png' height='50' width='50' alt='Inbox Pilot Logo'></Image></div>
            <div className='logo font-bold text-3xl'>Inbox Pilot</div>
          </div>

          <ul className='flex gap-4 font-semibold'>
            <Link href="/"><li>Home</li></Link>
            <Link href="/pricing"><li>Pricing</li></Link>
            <Link href="/blog"><li>About</li></Link>
          </ul>

          <ul className='flex items-center gap-5'>
            <button className='border-2 border-cyan-400 font-bold w-28 h-12 rounded-lg'>
              <Link href="/login"><li>Sign In</li></Link>
            </button>

            <button className='border-2 border-cyan-600 w-32 h-12 rounded-lg font-bold bg-cyan-600'>
              <Link href="/dashboard"><li>Get Started</li></Link>
            </button>
          </ul>
        </nav>
      </header>
    )
  }
  if(session && session.user) {
    return (
      <header className='fixed top-0 left-0 right-0 z-50 bg-[#071021] border-b border-gray-700 text-white'>
        <nav className='flex px-10 justify-between items-center p-4'>
          <div className='flex justify-center items-center gap-5'>
            <div className='img'><Image src='/fav.png' height='40' width='40' alt='Inbox Pilot Logo'></Image></div>
            <div className='logo font-bold text-2xl'>Inbox Pilot</div>
          </div>

          <ul className='flex gap-4 font-semibold'>
            <Link href="/"><li>Home</li></Link>
            <Link href="/pricing"><li>Pricing</li></Link>
            <Link href="/blog"><li>About</li></Link>
          </ul>

          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md border border-gray-700 text-sm'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="6" width="20" height="12" rx="2" ry="2" strokeWidth="1.5" />
                <path d="M8 10h.01" strokeWidth="1.5" />
              </svg>
              <span>{session?.user?.credits ?? '0'} credits</span>
            </div>

            <Link href="/dashboard/generate">
              <button className='bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-md flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h6V4a1 1 0 112 0v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 01-1-1z" />
                </svg>
                Generate New Email
              </button>
            </Link>

            <div className='w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-500'>
              <Image src={session.user.image ?? '/fav.png'} alt='avatar' width={40} height={40} />
            </div>
          </div>
        </nav>
      </header>
    )
  }

}

export default Navbar