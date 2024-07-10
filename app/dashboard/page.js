"use client"

import { useSession , signIn , signOut } from 'next-auth/react'
import Dashboard from '@components/Dashboard';
import React from 'react'
import { useRouter } from 'next/navigation';

const DashboardPage = () => {

  const {data : session} = useSession();

  if(!session){
    
    const router = useRouter();
    router.push('/login')
  
  }

  return (
    <div>
      <Dashboard/>
    </div>
  )
}

export default DashboardPage
