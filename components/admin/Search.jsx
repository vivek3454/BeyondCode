"use client";
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { useApiQuery } from "@/hooks/useApiQuery";
import {
    Search as SearchIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Loader from "../Loader";

const Search = () => {
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const down = (e) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const { data, isLoading, error } = useApiQuery({
        url: "/user/search",
        queryKey: "search",
        params: { searchQuery: debouncedQuery },
        options: { enabled: !!debouncedQuery && open }
    });


    const handleOnSelect = (item) => {
        if (item?.isLink) {
            router.push(`/admin/details/${item?._id}`);
            setOpen(false);
        }
    }


    return (
        <>
            <button onClick={() => setOpen(true)} className="rounded-md flex justify-between w-72 items-center px-3 py-2 bg-slate-100 dark:bg-[hsl(var(--sidebar-background))]">
                <p className="flex items-center gap-1 text-gray-500">
                    <SearchIcon className="w-5 h-5" />
                    Search
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">ctrl + </span>J
                </kbd>
            </button>
            <CommandDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
                <CommandInput value={searchQuery} onValueChange={setSearchQuery} placeholder="Search..." />
                <CommandList>
                    {data?.searchResults?.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
                    {isLoading &&
                        <div className="h-8">
                            <Loader className="mt-2" />
                        </div>
                    }
                    {data?.searchResults.map((item) => (
                        <CommandItem key={item?._id} onSelect={() => handleOnSelect(item)}>
                            <span>{item?.title}</span>
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default Search