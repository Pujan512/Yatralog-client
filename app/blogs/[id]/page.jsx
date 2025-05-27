'use client'
import { useAuthStore } from '@/app/lib/store/useAuthStore';
import { useBlogStore } from '@/app/lib/store/useBlogStore'
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { getComments, deleteComment } from '@/app/lib/comment';
import CommentForm from '@/app/components/CommentForm';
import toast from 'react-hot-toast';

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { getBlog, selectedBlog } = useBlogStore();
  const { authUser } = useAuthStore();
  const { id } = useParams();
  const author = selectedBlog?.authorId ? selectedBlog?.authorId.fName + " " + selectedBlog?.authorId?.lName : '';

  const handleDelete = async (id) => {
    try {
      const res = await deleteComment(id);
      if (res.status === 201)
        toast.success("Comment deleted successfully");
      const updatedComments = comments.filter(c => c._id != id);
      setComments(updatedComments)
    } catch (error) {
      console.log(error);
    }
  }

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

    const fetchComments = async () => {
      try {
        const data = await getComments(id);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBlog();
    fetchComments();
  }, [])

  if (loading) return <div>Loading...</div>

  if (!loading && !authUser) redirect('/login');

  return (
    <article className='mx-50 my-5 w-full flex flex-col gap-3'>
      <section className='flex items-center gap-3'>
        <img className='size-8 rounded-full' src={selectedBlog.authorId.profilePic} alt={author} />
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
      <hr className='text-gray-400 mt-10'/>
      <section className='flex flex-col gap-5'>
        <h3 className='text-2xl font-semibold'>Comments</h3>
        <CommentForm comments={comments}
          setComments={setComments}
          authorId={authUser._id}
          blogId={id}
          fName={authUser.fName}
          lName={authUser.lName}
        />
        <div className='max-h-100 overflow-y-auto flex flex-col gap-5'>
          {comments.length > 0 ? comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((comment, index) => (
            <article key={index} className='flex justify-between relative p-4 bg-blue-300/20'>
              <div>
                <p className='text-lg'>{comment.content}</p>
                <p className='text-sm text-gray-500'>{comment.author.fName + ' ' + comment.author.lName}</p>
              </div>
              <p className='flex items-end text-sm text-gray-700'>{moment(comment.createdAt).fromNow()}</p>
              {comment.author._id === authUser._id && <button className='outline-1 cursor-pointer absolute right-5' onClick={() => handleDelete(comment._id)}>Delete</button>}
            </article>
          )) : <article className='text-lg text-center'>----- No comments found! -----</article>}
        </div>
      </section>
    </article>
  )
}

export default Blog