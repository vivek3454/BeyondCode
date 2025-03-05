"use client";
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { toast } from 'sonner';
import LogoutAlertModal from './LogoutAlertModal';
import Search from './Search';


const AdminHeader = () => {
    const [isDarkModeOn, setIsDarkModeOn] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    console.log("session", session);

    useEffect(() => {
        const storedTheme = JSON.parse(localStorage.getItem("isDarkModeOn"));
        if (storedTheme) {
            setIsDarkModeOn(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isDarkModeOn', isDarkModeOn);
        document.documentElement.classList.toggle('dark', isDarkModeOn);
    }, [isDarkModeOn]);

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/")
            toast.success("Signed out successfully");
        } catch {
            toast.error("Failed to sign out");
        }
    };


    return (
        <div className='border-b-2 dark:bg-black w-full sticky bg-white top-0 px-5 pl-4 h-16 z-10 flex justify-between items-center'>
            <div></div>
            <div className='flex gap-2 items-center'>
                <Search />
                {session &&
                    <button className='hover:bg-slate-100 hover:dark:text-black rounded-full w-10 h-10 flex text-xl justify-center items-center' onClick={() => setIsLogoutModalOpen(true)}>
                        <LogOut className='w-5 h-5' />
                    </button>}
                <button className='hover:bg-slate-100 hover:dark:text-black rounded-full w-10 h-10 flex text-xl justify-center items-center' onClick={() => setIsDarkModeOn((prev) => !prev)}>
                    {isDarkModeOn ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
                </button>
            </div>
            {/* <Button onClick={()=>router.push("/sign-in")} className="w-28">Login</Button> */}
            {isLogoutModalOpen &&
                <LogoutAlertModal
                    handleLogout={handleSignOut}
                    isLogoutModalOpen={isLogoutModalOpen}
                    setIsLogoutModalOpen={setIsLogoutModalOpen}
                />
            }
        </div>
    )
}

export default AdminHeader