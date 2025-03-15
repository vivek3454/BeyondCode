"use client";

import CustomSkeleton from "@/components/CustomSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiQuery } from "@/hooks/useApiQuery";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import parse from "html-react-parser";
import { Check, Copy } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const generateUniqueId = () => crypto.randomUUID();

const Details = () => {
    const params = useParams();

    const { data: menuItemData, isLoading: isMenuItemLoading } = useApiQuery({
        url: "/menu-item",
        queryKey: "menuItem",
        params: { menuItemId: params?.id },
    });

    console.log("menuItemData", menuItemData);


    const { data, isLoading, error } = useApiQuery({
        url: "/user/content",
        queryKey: "content",
        params: { menuItemId: params?.id },
    });

    console.log("data", data);


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
                {isMenuItemLoading ?
                    <Skeleton className="w-1/2 h-[30px]" />
                    : <h1 className="text-[2rem] font-extrabold capitalize">
                        {menuItemData?.menuItem?.title}
                    </h1>}
            </div>

            {data?.content?.length === 0 && <p className="mt-10">No content added</p>}

            {isLoading ?
                <CustomSkeleton />

                : <div className="w-full mt-10 details" ref={contentRef}>

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
                </div>}
        </div>
    );
};

export default Details;
