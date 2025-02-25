import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteMenuItem } from '@/hooks/useDeleteMenuItem';


const DeleteAlertModal = ({ isDeleteModalOpen, setIsDeleteModalOpen }) => {
    const { mutate, isLoading } = useDeleteMenuItem();
    const handleDelete = () => {
        setIsDeleteModalOpen(true);
        mutate({ ...data, parentId: parentId ? parentId : null }, { onSuccess: () => setIsDeleteModalOpen(false) });
    }

    return (
        <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>{isLoading ? "Deleting..." : "Delete"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteAlertModal