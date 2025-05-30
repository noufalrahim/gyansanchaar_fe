import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {

    const isMobile = useIsMobile();

    return (
        <SidebarProvider>
            {
                isMobile && <AppSidebar />
            }
            <div className="w-full items-center justify-center flex flex-col">
                <Navbar />
                <main className="pt-24 w-full min-h-screen items-start flex flex-col justify-start">
                    {children}
                </main>
                <Toaster />
                <Footer />
            </div>
        </SidebarProvider>
    )
};
