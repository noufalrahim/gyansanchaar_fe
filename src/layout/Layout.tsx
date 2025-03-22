import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

interface LayoutProps {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="w-full items-center justify-center flex flex-col">
            <Navbar />
            <main className="py-20 w-full min-h-screen items-center flex flex-col justify-center">
                {children}
            </main>
            <Footer />
        </div>
    )
}
