import { create } from "zustand";
import { axiosInstance } from "../axios";

export const useBlogStore = create((set)=>({
    blogs: [],

    getBlogs: async () => {
        try {
            const res = await axiosInstance.get("/blogs");
            set({blogs: res.data});
        } catch (error) {
            console.log(error.response.data.message);
            set({blogs: []});
        }
    },

    getBlog: async () => {
        
    },

    postBlog: async (data) => {
        
    },

    deleteBlog: async () => {

    },

    updateBlog: async (data) => {
        
    }
}))