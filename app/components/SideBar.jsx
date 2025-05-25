import Link from 'next/link'

const SideBar = ({active}) => {

  return (
    <aside className='w-60 bg-red-300'>
        <nav className='flex flex-col text-2xl items-center gap-5 mt-5'>
            <Link className={`${active === 'profile' ? 'text-red-600' : ''}`} href='/user/profile'>Profile</Link>
            <hr className='text-black w-[80%]'/>
            <Link className={`${active === 'blog' ? 'text-red-600' : ''}`} href='/user/my-blogs'>My blogs</Link>
        </nav>
    </aside>
  )
}

export default SideBar