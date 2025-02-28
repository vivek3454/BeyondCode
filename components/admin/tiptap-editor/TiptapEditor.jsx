'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import {
    Slash,
    SlashCmd,
    SlashCmdProvider,
    createSuggestionsItems,
    enableKeyboardNavigation,
} from "@harshtalks/slash-tiptap"

import { forwardRef, useImperativeHandle, useState } from 'react'
import Placeholder from '@tiptap/extension-placeholder'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command"

const suggestions = createSuggestionsItems([
    {
        title: "text",
        searchTerms: ["paragraph"],
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run();
        },
    },
    {
        title: "Bullet List",
        searchTerms: ["unordered", "point"],
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
    },
    {
        title: "Ordered List",
        searchTerms: ["ordered", "point", "numbers"],
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
    },
]);


const TiptapEditor = forwardRef(({ contentString = "" }, ref) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit,
            Slash.configure({
                suggestion: {
                    items: () => suggestions,
                },
            }),
            // Placeholder.configure({
            //     placeholder: ({ node }) => {
            //         if (node.type.name === "paragraph") {
            //             return "Press / to see available commands";
            //         }
            //         return "";
            //     },
            // }),
            Placeholder.configure({
                placeholder: "Press / to see available commands",
            }),
        ],
        editorProps: {
            handleDOMEvents: {
                keydown: (_, v) => enableKeyboardNavigation(v),
            },
            // attributes: {
            //     class:
            //         "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
            // },
        },
        content: "",
        immediatelyRender: false,
    });

    useImperativeHandle(ref, () => ({
        getContent: () => editor?.getHTML() || '',
    }))

    if (!editor) return <p>Loading editor...</p>;
    return (
        <div className="w-full">
            {/* <div className="mb-2 flex gap-2 border-b pb-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 border rounded ${editor?.isActive('bold') ? 'bg-gray-300' : ''}`}>B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 border rounded ${editor?.isActive('italic') ? 'bg-gray-300' : ''}`}>I</button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`px-2 py-1 border rounded ${editor?.isActive('underline') ? 'bg-gray-300' : ''}`}>U</button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`px-2 py-1 border rounded ${editor?.isActive('strike') ? 'bg-gray-300' : ''}`}>S</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 border rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`}>H2</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-2 py-1 border rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''}`}>H3</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={`px-2 py-1 border rounded ${editor?.isActive('heading', { level: 4 }) ? 'bg-gray-300' : ''}`}>H4</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 border rounded ${editor?.isActive('bulletList') ? 'bg-gray-300' : ''}`}>• List</button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1 border rounded ${editor?.isActive('orderedList') ? 'bg-gray-300' : ''}`}>1. List</button>
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`px-2 py-1 border rounded ${editor?.isActive('blockquote') ? 'bg-gray-300' : ''}`}>“ Quote</button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`px-2 py-1 border rounded ${editor?.isActive('codeBlock') ? 'bg-gray-300' : ''}`}>{ } Code</button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="px-2 py-1 border rounded">— HR</button>
            </div> */}

            {/* Editor Content */}

            <SlashCmdProvider>
                <EditorContent editor={editor} className="py-2 prose max-w-none h-full w-full" />
                <SlashCmd.Root editor={editor}>
                    <SlashCmd.Cmd>
                        <SlashCmd.Empty>No commands available</SlashCmd.Empty>
                        <SlashCmd.List className='bg-white shadow-md rounded-lg'>
                            {suggestions.map((item) => {
                                return (
                                    <SlashCmd.Item
                                        value={item.title}
                                        onCommand={(val) => {
                                            item.command(val);
                                        }}
                                        key={item.title}
                                        className='cursor-pointer px-4 py-1'
                                    >
                                        <p>{item.title}</p>
                                    </SlashCmd.Item>
                                );
                            })}
                        </SlashCmd.List>
                    </SlashCmd.Cmd>
                </SlashCmd.Root>
            </SlashCmdProvider>

            {/* <div className="p-4 border w-full relative">

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                <EditorContent editor={editor} className="px-4 py-2 prose max-w-none h-full w-full" />
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                        <Command>
                            <CommandInput
                                placeholder="Search commands..."
                                value={search}
                                onValueChange={setSearch}
                            />
                            <CommandList>
                                <CommandEmpty>No commands available</CommandEmpty>
                                {suggestions
                                    .filter((item) =>
                                        item.title.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((item) => (
                                        <CommandItem
                                            key={item.title}
                                            onSelect={() => {
                                                item.command({ editor, range: {} });
                                                setOpen(false);
                                            }}
                                        >
                                            {item.title}
                                        </CommandItem>
                                    ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div> */}
        </div>
    )
})

export default TiptapEditor
