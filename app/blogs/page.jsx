'use client';
import React, { useEffect, useState } from 'react'
import { useBlogStore } from '../lib/store/useBlogStore'
import { useRouter } from 'next/navigation';
import moment from 'moment';

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const { blogs, getBlogs } = useBlogStore();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(search) || blog.description.toLowerCase().includes(search))
                             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await getBlogs();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [])

  if (loading) return <section>Loading...</section>

  return (
    <article className='mx-50 my-5 w-full flex flex-col gap-10'>
      <section className='flex gap-5 justify-center'>
        <input className='outline-1 flex w-150 px-4 py-2' type='search'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search blogs' />
      </section>
      <section className='grid grid-cols-2 gap-x-15 gap-y-10'>{filteredBlogs.map((blog, index) => (
        <article
          className='cursor-pointer outline-1 p-5 h-40'
          key={index} onClick={() => router.push('/blogs/' + blog._id)}>
          <h2 className='text-2xl font-medium'>{blog.title[0].toUpperCase() + blog.title.slice(1)}</h2>
          <span className='text-sm text-gray-600'>{moment(blog.createdAt).fromNow()}</span>
          <p className='whitespace-pre-wrap line-clamp-3'>{blog.description}</p>
        </article>
      ))}
      </section>
    </article>
  )
}

export default Blogs