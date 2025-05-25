'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useAuthStore } from '../lib/store/useAuthStore'

const NavBar = () => {
  const {authUser, logout} = useAuthStore();

  useEffect(()=>{

  },[]);

  return (
    <nav className='h-15 bg-gray-700 flex items-center px-20 text-white justify-between fixed w-screen'>
      <div className='flex items-center gap-10'>
        <Link className='text-3xl font-bold' href='/'>Yatralog</Link>
        <Link href='/'>Home</Link>
        <Link href='/blogs'>Blogs</Link>
      </div>
      {!authUser ? 
      <div className='flex gap-10'>
        <Link href='/login'>Login</Link>
        <Link href='/signup'>Signup</Link>
      </div> :
      <div className='flex gap-8 items-center'>
        <Link className='outline-1 px-4 py-2 rounded-md' href='/addBlog'>Add +</Link>
        <Link href='/user/profile'>User</Link>
        <button className='cursor-pointer' onClick={() => logout()}>Logout</button>
      </div>
      }
    </nav>
  )
}

export default NavBar