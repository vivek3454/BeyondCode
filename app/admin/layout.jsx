import { AdminSidebar } from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

const MainLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="w-full flex">
                <aside>
                    <AdminSidebar />
                </aside>
                <div className="w-full">
                    <AdminHeader />
                    <main className="p-5 relative">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default MainLayout;