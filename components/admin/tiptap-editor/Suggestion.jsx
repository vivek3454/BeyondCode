import { createSuggestionsItems } from "@harshtalks/slash-tiptap";
import { Heading1, Heading2, Heading3, List, ListOrdered, Type, Link, Minus, Code, TextQuote, Table, Youtube } from "lucide-react";

export const getSuggestions = (onOpenLinkPopover) =>
    createSuggestionsItems([
        {
            title: "Text",
            desc: "Start writing with plain text",
            icon: <Type className="w-5 h-5 text-gray-600" />,
            searchTerms: ["paragraph"],
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run();
            },
        },
        {
            title: "Heading 1",
            desc: "Big heading",
            icon: <Heading1 className="w-5 h-5 text-gray-600" />,
            searchTerms: ["heading"],
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
            },
        },
        {
            title: "Heading 2",
            desc: "Medium heading",
            icon: <Heading2 className="w-5 h-5 text-gray-600" />,
            searchTerms: ["heading"],
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
            },
        },
        {
            title: "Heading 3",
            desc: "Small heading",
            icon: <Heading3 className="w-5 h-5 text-gray-600" />,
            searchTerms: ["heading"],
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
            },
        },
        {
            title: "Bullet List",
            desc: "Create a simple bullet list",
            icon: <List className="w-5 h-5 text-gray-600" />,
            searchTerms: ["unordered", "point"],
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleBulletList().run();
            },
        },
        {
            title: "Numbered List",
            desc: "Create a simple numbered list",
            icon: <ListOrdered className="w-5 h-5 text-gray-600" />,
            searchTerms: ["ordered", "point", "numbers"],
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleOrderedList().run();
            },
        },
        {
            title: "Link",
            desc: "Insert a link",
            icon: <Link className="w-5 h-5 text-gray-600" />,
            searchTerms: ["link", "url", "hyperlink"],
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).run();
                onOpenLinkPopover(editor);
            },
        },
        {
            title: "Divider",
            desc: "Insert a dividing line",
            icon: <Minus className="w-5 h-5 text-gray-600" />,
            searchTerms: ["divider", "hr", "line"],
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setHorizontalRule().run();
            },
        },
        {
            title: "Code",
            desc: "Add a code block",
            icon: <Code className="w-5 h-5 text-gray-600" />,
            searchTerms: ["code", "snippet", "pre"],
            command: ({ editor, range }) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode("codeBlockLowlight", { language: "javascript" }) // ✅ Default: JavaScript
                    .run();
            },
        },
        {
            title: "Quote",
            icon: <TextQuote className="w-5 h-5 text-gray-600" />,
            desc: "Add a quote",
            searchTerms: ["quote", "blockquote"],
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleBlockquote().run();
            },
        },
        {
            title: "Table",
            icon: <Table className="w-5 h-5 text-gray-600" />,
            desc: "Insert a table",
            searchTerms: ["table", "grid", "rows", "columns"],
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range)
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: false }) // Default: 3x3 Table
                    .run();
            },
        },
        {
            title: "YouTube",
            icon: <Youtube className="w-5 h-5 text-gray-600" />,
            desc: "Embed a YouTube video",
            searchTerms: ["video", "youtube", "embed"],
            command: ({ editor, range }) => {
                const url = prompt("Enter YouTube Video URL:");
                if (url) {
                    editor.chain().focus().deleteRange(range).setYoutubeVideo({ src: url }).run();
                }
            },
        },
    ]);
