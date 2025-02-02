"use client";
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { SidebarTrigger } from './ui/sidebar';

const Header = () => {
    const router = useRouter()
    return (
        <div className='border-b-2 w-full sticky bg-white top-0 px-5 pl-4 h-16 flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <SidebarTrigger />
                
            </div>
            <Button onClick={()=>router.push("/sign-in")} className="w-28">Login</Button>
        </div>
    )
}

export default Header