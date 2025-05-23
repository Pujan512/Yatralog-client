'use client'

import { useParams } from "next/navigation";
import BlogForm from "../../components/BlogForm";
import { useBlogStore } from "../../lib/store/useBlogStore"
import { useEffect, useState } from "react";

const EditBlog = () => {
  const { id } = useParams();
  const { updateBlog, selectedBlog, getBlog } = useBlogStore();
  const [isLoading, setIsLoading] = useState(true);
  const handleUpdate = updateBlog.bind(null, id);

  useEffect(() => {
    const loadData = async () => {
      try {
        await getBlog(id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <> 
      <BlogForm id={id} btnText={"Update"} formAction={handleUpdate} title={selectedBlog?.title} description={selectedBlog?.description} />
    </>
  )
}

export default EditBlog