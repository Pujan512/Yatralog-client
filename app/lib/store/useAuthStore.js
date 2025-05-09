import { create } from 'zustand';
import { axiosInstance } from '../axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({ authUser: null });
        }
    },

    signup: async (data) => {
        try {
            const res = await axiosInstance.post('auth/signup', data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            set({ authUser: res.data });
        }
    },

    login: async (data) => {
        try {
            const res = await axiosInstance.post('auth/login', data);
            set({ authUser: res.data });
            toast.success("Logged in Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            set({ authUser: null });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.get('auth/logout');
            set({ authUser: null });
            toast.success("Logged out Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        try {
            const res = axiosInstance.post('/auth/updateProfile', data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}))