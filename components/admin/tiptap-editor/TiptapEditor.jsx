"use client";

import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getSuggestions } from "./Suggestion";
import "highlight.js/styles/monokai-sublime.css";

import {
    Slash,
    SlashCmd,
    SlashCmdProvider,
    enableKeyboardNavigation,
} from "@harshtalks/slash-tiptap";
// import 'highlight.js/styles/github-dark.css';
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import LinkPopover from "./LinkPopover";

import Blockquote from "@tiptap/extension-blockquote";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import EmbedYtPopover from "./EmbedYtPopover";
import { common, createLowlight } from "lowlight";
import CodeBlockComponent from "./CustomCodeBlockLowlight";
import SelectionPopover from "./SelectionPopover";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Strike from "@tiptap/extension-strike";
import CustomSkeleton from "@/components/CustomSkeleton";
import { useParams } from "next/navigation";
import { useApiQuery } from "@/hooks/useApiQuery";

const lowlight = createLowlight(common);

const TiptapEditor = forwardRef((_, ref) => {
    const [showLinkPopover, setShowLinkPopover] = useState(false);
    const [showSelectionPopover, setShowSelectionPopover] = useState(false);
    const [showEmbedYtPopover, setShowEmbedYtPopover] = useState(false);
    const [editorInstance, setEditorInstance] = useState(null);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const params = useParams();

    const onOpenLinkPopover = (editor) => {
        setShowEmbedYtPopover(false);
        setEditorInstance(editor);
        if (!editor) {
            return;
        }

        const { from } = editor.state.selection;
        const coords = editor.view.coordsAtPos(from); // Get cursor position
        const editorRect = editor.view.dom.getBoundingClientRect(); // Get editor position

        setPopoverPosition({
            top: coords.top - editorRect.top + 30, // Adjust popover's position
            left: coords.left - editorRect.left + window.scrollX,
        });

        setShowLinkPopover(true);
    };
    const onOpenEmbedYtVideoPopover = (editor) => {
        setShowLinkPopover(false);
        setEditorInstance(editor);
        if (!editor) {
            return;
        }

        const { from } = editor.state.selection;
        const coords = editor.view.coordsAtPos(from); // Get cursor position
        const editorRect = editor.view.dom.getBoundingClientRect(); // Get editor position

        setPopoverPosition({
            top: coords.top - editorRect.top + 30, // Adjust popover's position
            left: coords.left - editorRect.left + window.scrollX,
        });

        setShowEmbedYtPopover(true);
    };

    const suggestions = getSuggestions(
        onOpenLinkPopover,
        onOpenEmbedYtVideoPopover
    );

    const { data, isLoading: isGetContentLoading, error } = useApiQuery({
        url: "/content",
        queryKey: "content",
        params: { menuItemId: params?.name }
    });

    console.log("data content", data);


    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            Underline,
            Highlight.configure({ multicolor: true }),
            Slash.configure({
                suggestion: {
                    items: () =>
                        getSuggestions(onOpenLinkPopover, onOpenEmbedYtVideoPopover),
                },
            }),
            // Strike,
            Placeholder.configure({
                placeholder: `Type "/" for commands`,
            }),
            Link.configure({
                openOnClick: false, // Disable default behavior
                HTMLAttributes: {
                    class: "text-blue-500 underline cursor-pointer",
                    onClick: (event) => {
                        event.preventDefault();
                        if (editorInstance) {
                            onOpenLinkPopover(editorInstance);
                        }
                    },
                },
            }),
            // HorizontalRule,
            CodeBlockLowlight.extend({
                addNodeView() {
                    return ReactNodeViewRenderer(CodeBlockComponent);
                },
            }).configure({ lowlight }),
            // Blockquote,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableCell,
            TableHeader,
            Typography,
            Youtube.configure({
                inline: false, // Ensures video is block-level
                width: 560, // Default width
                height: 315, // Default height
                allowFullscreen: true,
            }),
        ],
        editorProps: {
            handleDOMEvents: {
                keydown: (_, v) => enableKeyboardNavigation(v),
            },
            handleClick: (view, pos, event) => {
                const attrs = view.state.doc
                    .nodeAt(pos)
                    ?.marks?.find((m) => m.type.name === "link")?.attrs;
                if (attrs) {
                    event.preventDefault();
                    onOpenLinkPopover(editor);
                }
            },
        },
        content: data?.content[0]?.contentString,
        immediatelyRender: false,
        onSelectionUpdate: ({ editor }) => {
            const { from, to } = editor.state.selection;

            if (from === to) {
                setShowSelectionPopover(false);
                return;
            }

            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);
            const rects = range.getClientRects();

            if (rects.length === 0) return;

            // Get the last rectangle to handle end-of-line selections
            const lastRect = rects[rects.length - 1];

            // Approximate popover size
            const popoverWidth = 800;
            const popoverHeight = 80;
            const padding = 8; // Avoid touching text

            let top = lastRect.top + window.scrollY - popoverHeight - padding;
            let left = lastRect.left + window.scrollX - popoverWidth / 2 + lastRect.width / 2;

            // Prevent popover overflow (viewport boundaries)
            if (left + popoverWidth > window.innerWidth) {
                left = window.innerWidth - popoverWidth - padding;
            }
            if (left < 0) {
                left = padding;
            }
            if (top < 0) {
                top = lastRect.bottom + window.scrollY + padding; // Move below if not enough space above
            }

            setPopoverPosition({ top, left });
            setShowSelectionPopover(true);
        }


    });

    useImperativeHandle(ref, () => ({
        getContent: () => editor?.getHTML() || "",
        contentId: data?.content[0]?._id,
    }));

    useEffect(() => {
        if (editor && data?.content[0]?.contentString) {
            setTimeout(() => editor.commands.setContent(data?.content[0]?.contentString));
        }
    }, [editor,data]);

    if (!editor) return <p>Loading editor...</p>;

    return (
        <div className="w-full relative">
            <SlashCmdProvider>
                {isGetContentLoading ?
                    <CustomSkeleton />
                    : <EditorContent
                        editor={editor}
                        className="py-2 prose max-w-none h-full dark:prose-invert w-full"
                    />
                }
                <SlashCmd.Root editor={editor}>
                    <SlashCmd.Cmd>
                        <SlashCmd.List className="bg-white dark:bg-gray-800 dark:text-white shadow-md border rounded-md flex flex-col gap-1 py-1 w-[300px] max-h-96 overflow-y-auto">
                            {suggestions.map((item) => {
                                return (
                                    <SlashCmd.Item
                                        value={item.title}
                                        onCommand={(val) => {
                                            item.command(val);
                                        }}
                                        key={item.title}
                                        className="cursor-pointer px-4 py-1 flex items-center gap-2 group hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        <div className="w-9 h-9 bg-gray-50 group-hover:bg-white rounded border flex justify-center items-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h2 className="capitalize text-sm">{item.title}</h2>
                                            <p className="text-gray-500 text-sm">{item.desc}</p>
                                        </div>
                                    </SlashCmd.Item>
                                );
                            })}
                        </SlashCmd.List>
                    </SlashCmd.Cmd>
                </SlashCmd.Root>
            </SlashCmdProvider>

            {showLinkPopover && (
                <LinkPopover
                    editor={editorInstance}
                    setShowLinkPopover={setShowLinkPopover}
                    popoverPosition={popoverPosition}
                />
            )}

            {showEmbedYtPopover && (
                <EmbedYtPopover
                    editor={editorInstance}
                    setShowEmbedYtPopover={setShowEmbedYtPopover}
                    popoverPosition={popoverPosition}
                />
            )}

            {showSelectionPopover && (
                <SelectionPopover
                    editor={editor}
                    setShowSelectionPopover={setShowSelectionPopover}
                    popoverPosition={popoverPosition}
                />
            )}
        </div>
    );
});

export default TiptapEditor;
