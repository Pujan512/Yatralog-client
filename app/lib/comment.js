import { axiosInstance } from "./axios";

export const getComments = async (id) => {
    const res = await axiosInstance.get('/comments/' + id);
    return res.data;
}

export const postComment = async (data) => {
    const res = await axiosInstance.post('/comments', data);
    return res.data;
}

export const deleteComment = async (id) => {
    return await axiosInstance.delete('/comments/' + id);
}