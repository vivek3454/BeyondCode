"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddMenuItemSchema } from '@/schemas/AddMenuItemSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from "../ui/button";
import { Input } from '../ui/input';
import { Switch } from "../ui/switch";

const AddMenuItemModal = ({ isAddMenuItemModalOpen, setIsAddMenuItemModalOpen }) => {
    const form = useForm({
        resolver: zodResolver(AddMenuItemSchema),
        defaultValues: {
            title: "",
            isLink: false,
            type: "single",
        }
    })


    const onSubmit = (data) => {
        console.log("data", data);
    }

    return (
        <Dialog open={isAddMenuItemModalOpen} onOpenChange={setIsAddMenuItemModalOpen}>
            <DialogContent className="max-w-[460px]">
                <DialogHeader>
                    <DialogTitle>Add Menu Item</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="single">Single</SelectItem>
                                                    <SelectItem value="multiple">Multiple</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isLink"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2"> {/* Added gap for spacing */}
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Is Link</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full h-10 text-base">
                            {/* {isLoading ? <Spinner size={30} /> : faq ? "Update" : "Add"} */}
                            Add
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default AddMenuItemModal