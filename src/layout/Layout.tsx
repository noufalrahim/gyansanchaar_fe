import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="w-full items-center justify-center flex flex-col">
            <Navbar />
            <main className="pt-24 w-full min-h-screen items-start flex flex-col justify-start">
                {children}
            </main>
            <Toaster />
            <Footer />
        </div>
    )
};
