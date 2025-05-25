'use client'
import SideBar from '@/app/components/SideBar';
import { useAuthStore } from '@/app/lib/store/useAuthStore';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const Profile = () => {
    const { authUser, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = async () => {
                setLoading(true);
                const base64Image = reader.result;
                setSelectedImg(base64Image);
                await updateProfile({ image: base64Image });
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    if (!authUser) redirect('/login')

    return (
        <section className='flex gap-20 w-full'>
            <SideBar active={'profile'}/>
            <section className='my-5 flex flex-1 '>
                <article className=' flex flex-col w-200'>
                    <h2 className='text-2xl font-semibold mb-5'>Personal Details</h2>
                    <div className='flex flex-col items-center mb-8 gap-5'>
                        <img className='size-50 rounded-full' src={selectedImg || authUser.profilePic || '/avatar.png'} />
                        <label>
                            <span className={`${loading ? "text-gray-700 cursor-not-allowed" : "cursor-pointer"} outline-1 px-4 py-2 rounded-lg`}>Change image</span>
                            <input disabled={loading} className='hidden' type='file' accept='/image/*' onChange={(e) => handleChange(e)} />
                        </label>
                    </div>
                    <section className='grid grid-cols-2 gap-5 text-lg w-full'>
                        <p className='flex gap-2 items-center'>First Name:
                            <span className='text-gray-700 outline-1 px-4 py-2 rounded-md flex flex-1'>
                                {authUser.fName}
                            </span>
                        </p>
                        <p className='flex gap-2 items-center'>Last Name:
                            <span className='text-gray-700 outline-1 px-4 py-2 rounded-md flex flex-1'>
                                {authUser.lName}
                            </span>
                        </p>
                        <p className='col-span-2 flex gap-2 items-center'>Email Address:
                            <span className='text-gray-700 outline-1 px-4 py-2 rounded-md flex flex-1'>
                                {authUser.email}
                            </span>
                        </p>
                    </section>
                </article>
            </section>
        </section>
    )
}

export default Profile