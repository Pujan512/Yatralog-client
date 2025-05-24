'use client';
import React, { useState } from 'react'
import { redirect } from 'next/navigation';
import { useAuthStore } from '../lib/store/useAuthStore';
import toast from 'react-hot-toast';

const BlogForm = ({ id, btnText, formAction, title, description }) => {

  const [formData, setFormData] = useState({
    title: title ?? "",
    description: description ?? "",
    images: []
  })

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  }

  const validate = () => {
    if (formData.title.length < 3) {
      toast.error("Title must be at least 3 characters long.");
      return false;
    }

    if (formData.description.length < 10) {
      toast.error("Description must be at least 10 characters long.");
      return false;
    }

    if (formData.images.length > 5) {
      toast.error("Maximum images limit: 5");
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formData.images?.forEach(image => {
      formDataToSend.append('images', image);
    })

    const res = await formAction(formDataToSend);
    if (res.success) btnText === 'Add' ? redirect('/blogs') : redirect('/blogs/' + id);
  }

  const { authUser } = useAuthStore();
  if (!authUser) redirect('/login');

  return (
    <section className='mx-auto my-10'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div className='grid grid-cols-2 gap-5'>
          <input
            className='outline-1 p-2 focus:outline-blue-500'
            value={formData.title} placeholder='Title' type="text" name="title" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <div>Images:<input
            className='file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100'
            type="file" accept='image/*' multiple={true} onChange={handleImageChange} /></div>
        <span className='text-sm -my-5 text-blue-800 col-start-2'>Note: Max limit - 5 images</span>
        </div>
        <textarea
          className='outline-1 px-4 py-2 focus:outline-blue-500'
          rows={12} cols={100} value={formData.description} placeholder='Description' type="text" name="description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        <input className='border-1 px-4 py-2 w-50 cursor-pointer' type="submit" value={btnText} />
      </form>
    </section>
  )
}

export default BlogForm