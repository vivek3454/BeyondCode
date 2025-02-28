"use client";

import { Button } from "@/components/ui/button";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useRouter } from "next/navigation";
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import DeleteAlertModal from "@/components/admin/DeleteAlertModal";
import { useApiMutation } from "@/hooks/useApiMutation";
import { DELETE } from "@/constants/apiMethods";
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

const Details = () => {
    const menuItem = sessionStorage.getItem("menuItem")
    const parsedMenuItem = menuItem ? JSON.parse(menuItem) : null;
    const title = parsedMenuItem?.name?.toLowerCase();
    const router = useRouter();
    const [isDeleteContentModalOpen, setIsDeleteContentModalOpen] = useState(false);

    const { data, isLoading, error } = useApiQuery({
        url: "/content",
        queryKey: "content",
        params: { menuItemId: parsedMenuItem?.id }
    });

    const { mutate: deleteContent, isLoading: isDeleteContentLoading } = useApiMutation({
        url: "/content",
        method: DELETE,
        invalidateKey: ["content"],
    });

    const handleDelete = () => {
        setIsDeleteContentModalOpen(true);
        deleteContent({ contentId: data?.content[0]?._id }, { onSuccess: () => setIsDeleteContentModalOpen(false) });
    }

    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.querySelectorAll("pre code").forEach((block) => {
                hljs.highlightElement(block);
            });
        }
    }, [data]);


    return (
        <div>
            <div className="flex justify-between items-center gap-3">
                <h1 className='text-[2rem] font-extrabold capitalize'>{parsedMenuItem?.name}</h1>
                {(data && data?.content?.length > 0) ?
                    <div className="flex items-center gap-2">
                        <Button onClick={() => router.push(`/admin/details/${title}/add-details`)}>Update Details</Button>
                        <Button className="bg-destructive hover:bg-destructive/90" onClick={() => setIsDeleteContentModalOpen(true)}>
                            <Trash2 />
                        </Button>
                    </div>
                    : <Button onClick={() => router.push(`/admin/details/${title}/add-details`)}>Add Details</Button>}
            </div>

            <div className="w-full mt-10 details">
                {(data && data?.content?.length == 0) &&
                    <p>No content added</p>
                }
                {data?.content.map(item =>
                    <div ref={contentRef} key={item?._id} className="prose max-w-none p-0 h-full w-full">{item?.contentString && parse(item?.contentString?.replace(/class=/g, 'className='))}</div>
                )}
            </div>

            {isDeleteContentModalOpen &&
                <DeleteAlertModal
                    isDeleteModalOpen={isDeleteContentModalOpen}
                    setIsDeleteModalOpen={setIsDeleteContentModalOpen}
                    handleDelete={handleDelete}
                    isLoading={isDeleteContentLoading}
                />
            }
        </div>
    )
}

export default Details