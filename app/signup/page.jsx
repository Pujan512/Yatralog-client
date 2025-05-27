"use client";
import React, { useState } from 'react'
import { useAuthStore } from '../lib/store/useAuthStore';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

const SignUp = () => {
  const { signup } = useAuthStore();
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    cPassword: ''
  });

  const validate = () => {
    const { fName, lName, email, password, cPassword } = formData;
    if (!fName) {
      toast.error("First Name is required");
      return false;
    }
    if (!lName) {
      toast.error("Last Name is required");
      return false;
    }
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 character long");
      return false;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      toast.error("Password must have at least one uppercase, lowercase, number and special character");
      return false;
    }
    if (formData.password !== formData.cPassword) {
      toast.error("Confirm password doesn't match password");
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    validate()
    await signup(formData);
    redirect('/blogs');
  }

  return (
    <article className='flex flex-1 justify-center items-center bg-[url(/bg-signup.jpg)] bg-cover'>
      <section className='size-fit py-10 px-15 bg-gray-100/70 text-black shadow-2xl rounded-xl'>
        <h2 className='text-4xl mb-5'>Create a new account</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col '>
            <label htmlFor='fName'>First Name</label>
            <input
              className='outline-1 rounded-lg px-4 py-2 focus:outline-blue-400'
              type="text"
              name="fName"
              id="fName"
              onChange={(e) => setFormData({ ...formData, fName: e.target.value })} />
          </div>
          <div className='flex flex-col '>
            <label htmlFor='lName'>Last Name</label>
            <input
              className='outline-1 rounded-lg px-4 py-2 focus:outline-blue-400'
              type="text"
              name="lName"
              id="lName"
              onChange={(e) => setFormData({ ...formData, lName: e.target.value })} />
          </div>

          <div className='flex flex-col col-span-2'>
            <label htmlFor='email'>Email</label>
            <input
              className='outline-1 rounded-lg px-4 py-2 focus:outline-blue-400'
              type="email"
              name="email"
              id="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>

          <div className='flex flex-col '>
            <label htmlFor='password'>Password</label>
            <input
              className='outline-1 rounded-lg px-4 py-2 focus:outline-blue-400'
              type="password"
              name="password"
              id="password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>

          <div className='flex flex-col '>
            <label htmlFor='cPassword'>Confirm Password</label>
            <input
              className='outline-1 rounded-lg px-4 py-2 focus:outline-blue-400'
              type="password"
              name="cPassword"
              id="cPassword"
              onChange={(e) => setFormData({ ...formData, cPassword: e.target.value })} />
          </div>

          <input className="mt-2 col-span-2 border-1 px-4 py-2 rounded-lg cursor-pointer" type="submit" value="SignUp" />
        </form>
        <p>Already have an account? <Link className="text-blue-500" href={'/login'}>Sign In</Link></p>
      </section>
    </article>
  )
}

export default SignUp