'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const Navbar = () => {

  const { data: session } = useSession();


  // if (!session) {


    return (
      <header className='bg-[#071021] border-b border-gray-700 text-white'>
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
  // }
  // if(session && session.user) {
  //   return (
  //     <div> Logged In Navbar</div>
  //   )
  // }

}

export default Navbar