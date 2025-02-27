'use client'

import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { ListItem } from '@tiptap/extension-list'
import OrderedList from '@tiptap/extension-ordered-list'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { forwardRef, useImperativeHandle } from 'react'

const lowlight = createLowlight(all)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('html', html)
lowlight.register('css', css)

const TiptapEditor = forwardRef(({ contentString = "" }, ref) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                bulletList: false,
                orderedList: false,
                listItem: false,
            }),
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            BulletList,
            OrderedList,
            ListItem,
            Blockquote,
            CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'javascript' }),
            HorizontalRule,
            HardBreak,
        ],
        content: contentString,
        immediatelyRender: false,
    })

    useImperativeHandle(ref, () => ({
        getContent: () => editor?.getHTML() || '',
    }))

    return (
        <div className="p-4 border  w-full">
            {/* Toolbar */}
            <div className="mb-2 flex gap-2 border-b pb-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 border rounded ${editor?.isActive('bold') ? 'bg-gray-300' : ''}`}>B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 border rounded ${editor?.isActive('italic') ? 'bg-gray-300' : ''}`}>I</button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`px-2 py-1 border rounded ${editor?.isActive('underline') ? 'bg-gray-300' : ''}`}>U</button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`px-2 py-1 border rounded ${editor?.isActive('strike') ? 'bg-gray-300' : ''}`}>S</button>
                {/* <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-2 py-1 border rounded ${editor?.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}`}>H1</button> */}
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 border rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`}>H2</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-2 py-1 border rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''}`}>H3</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={`px-2 py-1 border rounded ${editor?.isActive('heading', { level: 4 }) ? 'bg-gray-300' : ''}`}>H4</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 border rounded ${editor?.isActive('bulletList') ? 'bg-gray-300' : ''}`}>• List</button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1 border rounded ${editor?.isActive('orderedList') ? 'bg-gray-300' : ''}`}>1. List</button>
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`px-2 py-1 border rounded ${editor?.isActive('blockquote') ? 'bg-gray-300' : ''}`}>“ Quote</button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`px-2 py-1 border rounded ${editor?.isActive('codeBlock') ? 'bg-gray-300' : ''}`}>{ } Code</button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="px-2 py-1 border rounded">— HR</button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="px-4 py-2 prose max-w-none h-full w-full" />
        </div>
    )
})

export default TiptapEditor
