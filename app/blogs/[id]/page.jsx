'use client'
import { useAuthStore } from '@/app/lib/store/useAuthStore';
import { useBlogStore } from '@/app/lib/store/useBlogStore'
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import moment from 'moment';

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const { getBlog, selectedBlog } = useBlogStore();
  const { authUser } = useAuthStore();
  const { id } = useParams();
  const author = selectedBlog?.authorId ? selectedBlog?.authorId.fName + " " + selectedBlog?.authorId?.lName : '';
  console.log(selectedBlog);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        await getBlog(id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [])

  if (loading) return <div>Loading...</div>

  if (!loading && !authUser) redirect('/login');

  return (
    <article className='mx-50 my-5 w-full flex flex-col gap-3'>
      <section className='flex items-center gap-3'>
        <img className='size-8 rounded-full' src={selectedBlog.authorId.profilePic} alt={author}/>
        <h4 className='text-xl'>{author}</h4>
        <span className='text-sm text-gray-600'>{moment(selectedBlog.createdAt).format('lll')}</span>
      </section>
      <h2 className='text-5xl font-semibold'>{selectedBlog.title[0].toUpperCase() + selectedBlog.title.slice(1)}</h2>
      <section className='flex gap-5'>
        {selectedBlog.images?.map((imgSrc, index) => (
          <a key={index} href={imgSrc.url} target='_blank'>
            <img src={imgSrc.url}
              alt={selectedBlog.title}
              className='size-50 object-cover'
            />
          </a>
        ))}
      </section>
      <p className='whitespace-pre-wrap text-lg'>{selectedBlog.description}</p>
    </article>
  )
}

export default Blog