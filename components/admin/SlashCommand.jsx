import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";

const SlashCommand = Extension.create({
    name: "slashCommand",

    addOptions() {
        return {
            suggestion: {
                char: "/",
                command: ({ editor, range, props }) => {
                    if (!editor) return; // ✅ Ensure editor exists before running commands
                    props.action(editor); // ✅ Pass editor correctly
                },
                items: () => [
                    { title: "Heading 1", action: (editor) => editor?.chain().focus().toggleHeading({ level: 1 }).run() },
                    { title: "Heading 2", action: (editor) => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
                    { title: "Bold", action: (editor) => editor?.chain().focus().toggleBold().run() },
                    { title: "Italic", action: (editor) => editor?.chain().focus().toggleItalic().run() },
                ],
            },
        };
    },

    addProseMirrorPlugins() {
        return [
            Suggestion({
                char: this.options.suggestion.char,
                command: this.options.suggestion.command,
                items: this.options.suggestion.items,
                render: () => {
                    let component;
                    let popupContainer = document.createElement("div");

                    return {
                        onStart: (props) => {
                            if (!props.editor) return; // ✅ Ensure editor exists

                            component = new ReactRenderer(SlashCommandMenu, {
                                props: { ...props, editor: props.editor },
                                editor: props.editor,
                            });

                            document.body.appendChild(popupContainer);
                        },

                        onUpdate(props) {
                            component?.updateProps(props);
                        },

                        onKeyDown(props) {
                            if (props.event.key === "Escape") {
                                component?.destroy();
                                popupContainer.remove();
                                return true;
                            }
                            return component?.ref?.onKeyDown(props) || false;
                        },

                        onExit() {
                            component?.destroy();
                            popupContainer.remove();
                        },
                    };
                },
            }),
        ];
    },
});

const SlashCommandMenu = ({ editor, items }) => {
    const [open, setOpen] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowDown") {
                setSelectedIndex((prev) => (prev + 1) % items().length);
                e.preventDefault();
            } else if (e.key === "ArrowUp") {
                setSelectedIndex((prev) => (prev - 1 + items().length) % items().length);
                e.preventDefault();
            } else if (e.key === "Enter") {
                items()[selectedIndex].action(editor);
                setOpen(false);
                e.preventDefault();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, editor, items]);

    if (!editor) return null; // ✅ Ensure editor exists before rendering

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <span className="invisible"></span>
            </PopoverTrigger>
            <PopoverContent className="bg-white border rounded shadow-md p-2 w-48">
                {items().map((item, index) => (
                    <div
                        key={index}
                        className={`p-2 cursor-pointer ${selectedIndex === index ? "bg-gray-200" : ""}`}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => {
                            item.action(editor);
                            setOpen(false);
                        }}
                    >
                        {item.title}
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    );
};

export default SlashCommand;
