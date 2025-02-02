import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

const MainLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="w-full flex">
                <aside>
                    <AppSidebar />
                </aside>
                <div className="w-full">
                    <Header />
                    <main className="p-5">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default MainLayout;