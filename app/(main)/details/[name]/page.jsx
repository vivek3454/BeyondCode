"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import parse from 'html-react-parser';
import { useEffect, useRef } from "react";

const Details = () => {
    const menuItem = sessionStorage.getItem("menuItem")
    const parsedMenuItem = menuItem ? JSON.parse(menuItem) : null;

    const { data, isLoading, error } = useApiQuery({
        url: "/user/content",
        queryKey: "content",
        params: { menuItemId: parsedMenuItem?.id }
    });

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
            </div>

            <div className="w-full mt-10 details">
                {(data && data?.content?.length == 0) &&
                    <p>No content added</p>
                }
                {data?.content.map(item =>
                    <div ref={contentRef} key={item?._id} className="prose max-w-none p-0 h-full w-full">{item?.contentString && parse(item?.contentString?.replace(/class=/g, 'className='))}</div>
                )}
            </div>
        </div>
    )
}

export default Details