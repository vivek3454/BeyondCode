import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { AddLinkSchema } from "@/schemas/AddLinkSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const LinkPopover = ({ editor, popoverPosition, setShowLinkPopover }) => {
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
        setShowLinkPopover(false);
    };

    return (
        <div
            className="absolute bg-white dark:bg-gray-900 shadow-lg border p-3 rounded-md flex flex-col gap-5 max-w-md w-full"
            style={{ top: popoverPosition.top + 40, left: popoverPosition.left }}
        >
            <div className="flex justify-between items-center gap-3">
                <div className="flex gap-2 items-center">
                    <Link size={18} />
                    <h2 className="font-semibold">Hyperlink the text</h2>
                </div>
                <X className="cursor-pointer" onClick={() => setShowLinkPopover(false)} />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(insertLink)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Anchor Text</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Write something here"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        placeholder="https://..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Insert Link
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default LinkPopover;
