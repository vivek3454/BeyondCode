import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";


const LogoutAlertModal = ({ isLogoutModalOpen, setIsLogoutModalOpen, handleLogout }) => {

    return (
        <AlertDialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
            <AlertDialogContent className="max-w-sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure to logout?</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90 dark:bg-red-500 dark:hover:bg-red-600 dark:text-white" onClick={handleLogout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default LogoutAlertModal