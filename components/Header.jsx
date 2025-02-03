"use client";
import { useEffect, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { SidebarTrigger } from './ui/sidebar';
import Search from './Search';


const Header = () => {
    const [isDarkModeOn, setIsDarkModeOn] = useState(JSON.parse(localStorage.getItem("isDarkModeOn")));

    useEffect(() => {
        if (isDarkModeOn) {
            localStorage.setItem('isDarkModeOn', true)
            document.documentElement.classList.add('dark');
        }
        else {
            localStorage.setItem('isDarkModeOn', false)
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkModeOn])


    return (
        <div className='border-b-2 dark:bg-black w-full sticky bg-white top-0 px-5 pl-4 h-16 flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <SidebarTrigger />
            </div>
            <div className='flex gap-2 items-center'>
                <Search />
                <button className='hover:bg-slate-100 hover:dark:text-black rounded-full w-10 h-10 flex text-xl justify-center items-center' onClick={() => setIsDarkModeOn((prev) => !prev)}>
                    {isDarkModeOn ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
                </button>
            </div>
            {/* <Button onClick={()=>router.push("/sign-in")} className="w-28">Login</Button> */}
        </div>
    )
}

export default Header