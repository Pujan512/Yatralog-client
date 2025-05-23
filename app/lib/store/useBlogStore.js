import { create } from "zustand";
import { axiosInstance } from "../axios";
import { useParams } from "next/navigation";

export const useBlogStore = create((set, get)=>({
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
        const {id} = useParams();
        console.log(id);
    },

    postBlog: async (data) => {
        try {
            const res = await axiosInstance.post('/blogs', data);
            set({blogs: [...get().blogs, res.data]})
            return {success: true, data: res.data};
        } catch (error) {
            console.log(error.response.data.message);
            set({blogs: []});
            return {success: false};
        }
    },

    deleteBlog: async () => {

    },

    updateBlog: async (data) => {
        
    }
}))