import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { AddLinkSchema } from "@/schemas/AddLinkSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code, Highlighter, Link, Strikethrough, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SelectionPopover = ({ editor, popoverPosition, setShowSelectionPopover }) => {
    const form = useForm({
        resolver: zodResolver(AddLinkSchema),
        defaultValues: {
            text: "",
            url: "",
        }
    })

    useEffect(() => {
        const { state } = editor;
        const { selection } = state;
        const { from, to } = selection;
        const markType = state.schema.marks.link;

        let existingText = "";
        let existingURL = "";

        if (markType) {
            state.doc.nodesBetween(from, to, (node) => {
                const linkMark = node.marks.find(mark => mark.type === markType);
                if (linkMark) {
                    existingURL = linkMark.attrs.href; // Get link URL
                    existingText = node.text || ""; // Get link text
                }
            });
        }
        form.setValue("text", existingText);
        form.setValue("url", existingURL);
    }, [])


    const insertLink = (data) => {

        if (!data.url) return;

        editor.chain().focus().extendMarkRange("link").setLink({ href: data.url }).insertContent(data.text).run();
        setShowSelectionPopover(false);
    };

    return (
        <div
            className="absolute bg-white dark:bg-gray-900 shadow-lg border p-3 rounded-md flex items-center gap-5 max-w-md overflow-x-auto z-50 scrollbar-custom w-full"
            style={{ top: popoverPosition.top, left: popoverPosition.left }}
        >
            <Button variant="secondary" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "bg-black text-white hover:dark:text-black dark:bg-white dark:text-black hover:bg-black/90 hover:text-white" : ""}>
                B
            </Button>
            <Button variant="secondary" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "bg-black text-white hover:dark:text-black dark:bg-white dark:text-black hover:bg-black/90 hover:text-white" : ""}>
                I
            </Button>
            <Button variant="secondary" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "bg-black text-white hover:dark:text-black dark:bg-white dark:text-black hover:bg-black/90 hover:text-white" : ""}>
                U
            </Button>
            <Button variant="secondary" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive("strike") ? "bg-black text-white hover:dark:text-black dark:bg-white dark:text-black hover:bg-black/90 hover:text-white" : ""}>
                <Strikethrough />
            </Button>
            <Button variant="secondary" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "bg-black text-white hover:dark:text-black dark:bg-white dark:text-black hover:bg-black/90 hover:text-white" : ""}>
                H1
            </Button>
            <Button variant="secondary" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "bg-black text-white hover:dark:text-black dark:bg-white dark:text-black hover:bg-black/90 hover:text-white" : ""}>
                H2
            </Button>
            <Button variant="secondary" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive("heading", { level: 3 }) ? "bg-black text-white hover:dark:text-black dark:bg-white dark:text-black hover:bg-black/90 hover:text-white" : ""}>
                H3
            </Button>
            <Button variant="secondary" onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive("highlight") ? "bg-black text-white hover:dark:text-black dark:bg-white dark:text-black hover:bg-black/90 hover:text-white" : ""}>
                <Highlighter />
            </Button>
            <Button variant="secondary" onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive("code") ? "bg-black text-white hover:dark:text-black dark:bg-white dark:text-black hover:bg-black/90 hover:text-white" : ""}>
                <Code />
            </Button>
            {/* <Button variant="secondary" onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive("code") ? "bg-black text-white hover:dark:text-black dark:bg-white dark:text-black hover:bg-black/90 hover:text-white" : ""}>
                <Link />
            </Button> */}
        </div>
    );
};

export default SelectionPopover;
