'use client';
import React, { useState } from 'react'
import { redirect } from 'next/navigation';

const BlogForm = ({id, btnText, formAction, title, description}) => {

  const [formData, setFormData] = useState({
    title: title ?? "",
    description:description ?? "",
    images: []
  })

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

    //dynamic function post or edit
    const res = await formAction(formDataToSend);
    if(res.success) btnText ===' Add' ? redirect('/blogs') : redirect('/blogs/'+id);
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input value={formData.title} placeholder='Title' type="text" name="title" onChange={(e)=>setFormData({...formData, title: e.target.value})} />
        <textarea className='outline-1' rows={5} cols={30} value={formData.description} placeholder='Description' type="text" name="description" onChange={(e)=>setFormData({...formData, description: e.target.value})} />
        <input type="file" accept='image/*' multiple={true} onChange={handleImageChange}/>
        <input type="submit" value={btnText} />
      </form>
    </section>
  )
}

export default BlogForm