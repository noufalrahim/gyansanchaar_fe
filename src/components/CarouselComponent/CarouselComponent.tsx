import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react"

interface CarouselComponentProps {
    children: ReactNode;
}

export default function CarouselComponent({ children }: CarouselComponentProps) {

    const isMobile = useIsMobile();

    return (
        <Carousel>
            <CarouselContent>
                {children}
            </CarouselContent>
            {
                !isMobile && (
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                )
            }
        </Carousel>
    )
}
