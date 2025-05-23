'use client'
import { useBlogStore } from '../lib/store/useBlogStore';
import BlogForm from '../components/BlogForm';

const AddBlog = () => {
  const { postBlog } = useBlogStore();
  return (
    <>
      <BlogForm btnText={"Add"} formAction={postBlog}/>
    </>
  )
}

export default AddBlog