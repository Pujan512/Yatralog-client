'use client'
import SideBar from '@/app/components/SideBar';
import { useAuthStore } from '@/app/lib/store/useAuthStore';
import { useBlogStore } from '@/app/lib/store/useBlogStore'
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyBlogs = () => {
    const { blogs, getBlogs, deleteBlog } = useBlogStore();
    const { authUser } = useAuthStore();
    const myBlogs = blogs.filter(blog => blog.authorId === authUser?._id)
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const handleEdit = (id) => {
        router.push('/editBlog/' + id);
    }

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                await getBlogs();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, [])

    if (loading) return <section className='flex flex-1 items-center justify-center'>Loading...</section>

    return (
        <section className='flex gap-20 flex-1'>
            <SideBar active={'blog'} />
            {
                myBlogs.length < 1 ?
                    <article className='flex flex-col flex-1 items-center justify-center'>
                        <h1 className='text-9xl font-medium'>404</h1>
                        <p className='text-3xl'>No Blogs Found</p>
                    </article> :
                    <article className='flex flex-1 my-5'>
                        <table className='table-auto size-fit w-full mr-15'>
                            <thead className='border-y-1 border-gray-500'>
                                <tr className='text-left'>
                                    <th>S.N.</th>
                                    <th>Title</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-600'>
                                {myBlogs.map((blog, index) => (
                                    <tr key={index}>
                                        <td className='py-5'>{index + 1}</td>
                                        <td onClick={() => router.push('/blogs/' + blog._id)} className='cursor-pointer'>{blog.title}</td>
                                        <td className='text-right w-50'><button className='rounded-md cursor-pointer outline-1 px-4 py-2 bg-emerald-500 text-white' onClick={() => handleEdit(blog._id)}>Edit</button></td>
                                        <td className='text-right w-50'><button className='rounded-md cursor-pointer outline-1 px-4 py-2 bg-red-500 text-white' onClick={() => handleDelete(blog._id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </article>
            }
        </section>
    )
}

export default MyBlogs