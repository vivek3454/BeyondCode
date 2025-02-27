"use client";
import TiptapEditor from '@/components/TiptapEditor';
import { Button } from '@/components/ui/button';
import { PATCH, POST } from '@/constants/apiMethods';
import { useApiMutation } from '@/hooks/useApiMutation';
import { useApiQuery } from '@/hooks/useApiQuery';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const AddDetails = () => {
    const menuItem = sessionStorage?.getItem("menuItem");
    const router = useRouter();
    const parsedMenuItem = menuItem ? JSON.parse(menuItem) : null;

    const editorRef = useRef(null);
    const { mutate: addContent, isLoading } = useApiMutation({
        url: "/content",
        method: POST,
        invalidateKey: ["content"],
    });
    const { mutate: updateContent, isLoading: isUpdateContentLoading } = useApiMutation({
        url: "/content",
        method: PATCH,
        invalidateKey: ["content"],
    });

    const { data, isLoading: isGetContentLoading, error } = useApiQuery({
        url: "/content",
        queryKey: "content",
        params: { menuItemId: parsedMenuItem?.id }
    });

    const getContentString = () => {
        if (editorRef.current) {
            const contentString = editorRef.current.getContent()

            if (contentString) {
                if (data?.content[0]?.contentString) {
                    updateContent({ contentString, contentId: data?.content[0]?._id }, { onSuccess: () => router.push(`/admin/details/${parsedMenuItem?.name}`) });
                }
                else {
                    addContent({ contentString, menuItemId: parsedMenuItem?.id }, { onSuccess: () => router.push(`/admin/details/${parsedMenuItem?.name}`) });
                }
            }
        }
    }

    return (
        <div className='relative'>
            <div className='bg-white py-2 sticky mb-5 top-16 z-20 flex justify-between items-center gap-3'>
                <h1 className='text-xl font-semibold'>Add Details</h1>
                <Button disabled={isLoading || isUpdateContentLoading} onClick={getContentString}>{(isLoading || isUpdateContentLoading) ? "Submitting..." : "Submit Changes"}</Button>
            </div>

            <TiptapEditor contentString={data?.content[0]?.contentString} ref={editorRef} />
        </div>
    )
}

export default AddDetails