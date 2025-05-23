'use client';
import React, { useState } from 'react'
import { useBlogStore } from '../lib/store/useBlogStore';
import { redirect } from 'next/navigation';

const AddBlog = () => {

  const [formData, setFormData] = useState({
    title: "",
    description:"",
    images: []
  })
  const {postBlog} = useBlogStore();

  const handleImageChange = (e) => {

    setFormData({...formData, images: Array.from(e.target.files)});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formData.images?.forEach(image => {
      formDataToSend.append('images', image);
    })

    const res = await postBlog(formDataToSend);
    if(res.success) redirect('/blogs')
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input placeholder='Title' type="text" name="title" onChange={(e)=>setFormData({...formData, title: e.target.value})} />
        <input placeholder='Description' type="text" name="description" onChange={(e)=>setFormData({...formData, description: e.target.value})} />
        <input type="file" accept='image/*' multiple={true} onChange={handleImageChange}/>
        <input type="submit" value="Add" />
      </form>
    </section>
  )
}

export default AddBlog