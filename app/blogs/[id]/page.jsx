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
  const author = selectedBlog?.authorId ? selectedBlog.authorId.fName + " " + selectedBlog.authorId?.lName : '';

  useEffect(() => {
    const fetchBlog = async () =>{
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

  if(loading) return <div>Loading...</div>
  
  if(!loading && !authUser) redirect('/login');

  return (
    <section className='flex flex-1 flex-col'>
      <h2>{selectedBlog.title}</h2>
      <h4>{author}</h4>
      <span>{moment(selectedBlog.createdAt).format('lll')}</span>
      <article className='flex gap-5'>
        {selectedBlog.images?.map((imgSrc, index) => (
          <a key={index} href={imgSrc.url} target='_blank'>
            <img src={imgSrc.url}
              alt={selectedBlog.title}
              className='size-50 object-cover'
            />
          </a>
        ))}
      </article>
      <p>{selectedBlog.description}</p>
    </section>
  )
}

export default Blog