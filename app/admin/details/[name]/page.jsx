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
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const generateUniqueId = () => crypto.randomUUID();

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
    const [copiedCodeId, setCopiedCodeId] = useState(null);
    const codeBlockIds = useRef(new Map());

    useEffect(() => {
        if (contentRef.current) {
            const blocks = contentRef.current.querySelectorAll("pre code");
            blocks.forEach((block, index) => {
                hljs.highlightElement(block);
                block.setAttribute("data-id", index);
            });
        }
    }, [data]);

    const copyCode = (codeText, id) => {
        navigator.clipboard.writeText(codeText).then(() => {
            setCopiedCodeId(id);
            toast.success("Copied to clipboard!")
            setTimeout(() => setCopiedCodeId(null), 1500);
        });
    };


    return (
        <div>
            <div className="flex justify-between items-center gap-3">
                <h1 className='text-[2rem] font-extrabold capitalize'>{parsedMenuItem?.name}</h1>
                {(data && data?.content?.length > 0) ?
                    <div className="flex items-center gap-2">
                        <Button onClick={() => router.push(`/admin/details/${title}/add-details`)}>Update Details</Button>
                        <Button className="bg-destructive hover:bg-destructive/90 dark:bg-red-500 dark:hover:bg-red-600 dark:text-white" onClick={() => setIsDeleteContentModalOpen(true)}>
                            <Trash2 />
                        </Button>
                    </div>
                    : <Button onClick={() => router.push(`/admin/details/${title}/add-details`)}>Add Details</Button>}
            </div>

            <div className="w-full mt-10 details" ref={contentRef}>
                {data?.content?.length === 0 && <p>No content added</p>}

                {data?.content?.map((item) => (
                    <div key={item?._id} className="prose max-w-none dark:prose-invert p-0 h-full w-full">
                        {item?.contentString &&
                            parse(
                                item?.contentString.replace(/class=/g, "className="),
                                {
                                    replace: (domNode) => {
                                        if (domNode.name === "pre" && domNode.children.length > 0) {
                                            const codeBlock = domNode.children[0];
                                            if (codeBlock.name === "code") {
                                                const codeText = codeBlock.children?.[0]?.data || "";
                                                let id = codeBlockIds.current.get(codeText);
                                                if (!id) {
                                                    id = generateUniqueId();
                                                    codeBlockIds.current.set(codeText, id);
                                                }

                                                return (
                                                    <div className="relative">
                                                        <pre className="relative">
                                                            <code>{codeText}</code>
                                                        </pre>
                                                        <button
                                                            onClick={() => copyCode(codeText, id)}
                                                            className="absolute top-2 right-9 bg-gray-800 text-white p-2 text-sm rounded opacity-80 hover:opacity-100 flex items-center gap-1"
                                                        >
                                                            {copiedCodeId === id ? <Check size={16} /> : <Copy size={16} />}
                                                        </button>
                                                    </div>
                                                );
                                            }
                                        }
                                    },
                                }
                            )}
                    </div>
                ))}
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