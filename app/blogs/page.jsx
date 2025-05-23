'use client';
import React, { useEffect } from 'react'
import { useBlogStore } from '../lib/store/useBlogStore'

const Blogs = () => {
  const {blogs, getBlogs} = useBlogStore();

  useEffect(()=>{
    getBlogs();
  },[])  

  return (
    <section className='flex flex-1 flex-col'>{blogs.map((blog, index) =>(
      <h2 key={index}>{blog.title}</h2>
    ))}</section>
  )
}

export default Blogs