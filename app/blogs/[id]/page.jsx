'use client'
import { useBlogStore } from '@/app/lib/store/useBlogStore'
import { redirect, useParams } from 'next/navigation';
import React, { useEffect } from 'react'

const Blog = () => {
  const { getBlog, selectedBlog } = useBlogStore();
  const { id } = useParams();
  const author = selectedBlog.authorId ? selectedBlog.authorId.fName + " " + selectedBlog.authorId?.lName : '';

  useEffect(() => {
    getBlog(id);
  }, [])

  return (
    <section className='flex flex-1 flex-col'>
      <h2>{selectedBlog.title}</h2>
      <h4>{author}</h4>
      <article className='flex gap-5'>
        {selectedBlog.images?.map((imgSrc, index) => (
          <a key={index} href={imgSrc.url} target='_blank'>
            <img src={imgSrc.url}
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