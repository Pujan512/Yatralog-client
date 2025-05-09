"use client";
import React, { useState } from 'react'
import { useAuthStore } from '../lib/store/useAuthStore';
import Link from 'next/link';

const Login = () => {
  const {login} = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData)
  }

  return (
    <section className='container'>
      <article className='mx-auto w-100 bg-zinc-700 text-white p-10 rounded-md'>
        <h2 className='text-4xl mb-5'>Log In</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col '>
            <label htmlFor='email'>Email</label>
            <input 
              className='outline-1 rounded-lg px-4 py-2 focus:outline-blue-400' 
              type="email" 
              name="email" 
              id="email" 
              required
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className='flex flex-col '>
            <label htmlFor='password'>Password</label>
            <input 
              className='outline-1 rounded-lg px-4 py-2 focus:outline-blue-400' 
              type="password" 
              name="password" 
              id="password" 
              required 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <input className="border-1 px-4 py-2 rounded-lg cursor-pointer" type="submit" value="Login" />
        </form>
      </article>
      <p className='text-center'>Don&apos;t have an account? <Link href="/signup" className='text-blue-700'>Sign Up</Link></p>
    </section>
  )
}

export default Login