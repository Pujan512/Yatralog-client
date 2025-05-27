'use client'

import { useState } from "react"
import { postComment } from "../lib/comment";
import toast from "react-hot-toast";

const CommentForm = ({comments, setComments, blogId, authorId, fName, lName}) => {

    const [comment, setComment] = useState({
        content: '',
        author: authorId,
        blogId: blogId
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = await postComment(comment);
          toast.success("Comment added successfully");
          const author = {
            _id : data.author,
            fName: fName,
            lName: lName
          }
          data.author = author;
          setComments([...comments, data]);
          e.target.children[0].value = '';
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <form onSubmit={handleSubmit} className="flex gap-5">
        <input className="outline-1 flex flex-1 px-4 py-2" 
        type="text" name="content" placeholder="Add your comment" required
        onChange={(e)=>setComment({...comment, content: e.target.value})}/>
        <input className="outline-1 px-4 py-2" type="submit" value="Add" />
    </form>
  )
}

export default CommentForm