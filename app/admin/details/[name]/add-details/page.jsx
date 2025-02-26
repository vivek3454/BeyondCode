"use client";
import TiptapEditor from '@/components/TiptapEditor';
import { Button } from '@/components/ui/button';

const AddDetails = () => {
    const menuItem = sessionStorage?.getItem("menuItem")
    const parsedMenuItem = menuItem ? JSON.parse(menuItem) : null;
    console.log("parsedMenuItem", parsedMenuItem);


    return (
        <div className='relative'>
            <div className='bg-white py-2 sticky mb-5 top-16 z-10 flex justify-between items-center gap-3'>
                <h1 className='text-xl font-semibold'>Add Details</h1>
                <Button>Submit Changes</Button>
            </div>

            <TiptapEditor />
        </div>
    )
}

export default AddDetails