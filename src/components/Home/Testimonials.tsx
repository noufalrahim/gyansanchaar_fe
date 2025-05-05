import { SITE_CONFIG } from '@/constants/SITE_CONFIG'
import { TestimonialCard } from '../Cards'

export default function Testimonials() {
    return (
        <div className="w-full items-center flex justify-center bg-white py-10 text-center px-5">
            <div className="max-w-7xl w-full">
                <div className="items-center justify-center flex flex-col gap-5">
                    <p className="text-3xl text-primary-main font-bold">Student Success Stories</p>
                    <p className="text-md text-light-200">See how students like you achieved their college dreams with {SITE_CONFIG.NAME}.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 text-left">
                    <TestimonialCard />
                    <TestimonialCard />
                    <TestimonialCard />
                </div>
            </div>
        </div>
    )
}
