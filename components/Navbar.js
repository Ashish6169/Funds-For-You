"use client"

import React from 'react'
import Link from 'next/link'

import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {

  const { data: session } = useSession();



  return (

    <nav className='bg-gray-800 text-white flex justify-between items-center p-2'>
      <div className="logo p-5">
        <Link href={"/"} className='flex items-center'>
        <img src="/logo.png" height="30px" width="30px" alt="Logo" />
        <p className='mx-2'> Funds for You</p>
        </Link>
      </div>
      <div className='flex items-center'>
       
        {!session &&
          <Link href={"/login"}>
            <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Log In</button>
          </Link>}
        {session && 
          <Link href={"/dashboard"}>
            <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Dashboard</button>
          </Link>}
        {session &&
          <Link href={`/${session.user.name}`}>
            <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Payment page</button>
          </Link>}
        {session &&
          <button type="button" onClick={() => { signOut() }} class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Log Out</button>
        }
      </div>
    </nav>

  )
}

export default Navbar
