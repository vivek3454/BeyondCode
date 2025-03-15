"use client";
import TiptapEditor from '@/components/admin/tiptap-editor/TiptapEditor';
import { Button } from '@/components/ui/button';
import { PATCH, POST } from '@/constants/apiMethods';
import { useApiMutation } from '@/hooks/useApiMutation';
import { useApiQuery } from '@/hooks/useApiQuery';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const AddDetails = () => {
    const router = useRouter();
    const params = useParams();
    const [contentId, setContentId] = useState("");

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


    const getContentString = () => {
        if (editorRef.current) {
            const contentString = editorRef.current.getContent()
            const contentId = editorRef.current.contentId
            setContentId(contentId)
            console.log("contentString",contentString);
            console.log("contentId",contentId);
            

            if (contentString) {
                if (contentId) {
                    updateContent({ contentString, contentId }, { onSuccess: () => router.push(`/admin/details/${params?.name}`) });
                }
                else {
                    addContent({ contentString, menuItemId: params?.name }, { onSuccess: () => router.push(`/admin/details/${params?.name}`) });
                }
            }
        }
    }

    return (
        <div className='relative'>
            <div className='bg-white dark:bg-black dark:text-white py-2 sticky top-16 z-20 flex justify-between items-center gap-3'>
                <h1 className='text-xl font-semibold'>{contentId ? "Update Details" : "Add Details"}</h1>
                <Button disabled={isLoading || isUpdateContentLoading} onClick={getContentString}>{(isLoading || isUpdateContentLoading) ? "Submitting..." : "Submit Changes"}</Button>
            </div>

            <TiptapEditor ref={editorRef} />
        </div>
    )
}

export default AddDetails