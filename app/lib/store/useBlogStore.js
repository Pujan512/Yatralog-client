import { create } from "zustand";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

export const useBlogStore = create((set, get)=>({
    blogs: [],
    selectedBlog: {},

    getBlogs: async () => {
        try {
            const res = await axiosInstance.get("/blogs");
            set({blogs: res.data});
        } catch (error) {
            console.log(error.response.data.message);
            set({blogs: []});
        }
    },
    
    getBlog: async (id) => {
        try {
            const res = await axiosInstance.get("/blogs/"+id);
            set({selectedBlog: res.data})
        } catch (error) {
            console.log(error.response.data.message);
            set({selectedBlog: null});
        }
    },
    
    postBlog: async (data) => {
        try {
            const res = await axiosInstance.post('/blogs', data);
            toast.success("Blog added successfully")
            set({blogs: [...get().blogs, res.data]})
            return {success: true, data: res.data};
        } catch (error) {
            console.log(error.response.data.message);
            set({blogs: [...get().blogs]});
            return {success: false};
        }
    },
    
    deleteBlog: async (id) => {
        try {
            const res = await axiosInstance.delete("/blogs/"+id);
            toast.success("Blog deleted successfully");
            set({blogs: [...get().blogs.filter(blog => blog._id !== id)]})
        } catch (error) {
            console.log(error.response.data.message);
            set({blogs: [...get().blogs]});
        }
    },
    
    updateBlog: async (id, data) => {
        try {
            const res = await axiosInstance.put(`/blogs/${id}`, data);
            const updatedBlogs = [...get().blogs.filter(blog => blog._id !== id), res.data]
            toast.success("Blog updated successfully")
            set({blogs: updatedBlogs})
            return {success: true, data: res.data};
        } catch (error) {
            console.log(error.response.data.message);
            set({blogs: [...get().blogs]});
            return {success: false};
        }
    }
}))