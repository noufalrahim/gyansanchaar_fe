import { SITE_CONFIG } from "@/constants/SITE_CONFIG";
import { FeatureCard } from "../Cards";
import { CheckCircle2, Clock, GraduationCap, Users } from "lucide-react";

const features: {
    title: string;
    icon: React.ReactNode;
    description: string;
}[] = [
        {
            icon: <GraduationCap />,
            title: 'College Exploration',
            description: 'Browse and compare colleges based on programs, location, and admission requirements.'
        },
        {
            icon: <Clock />,
            title: 'Application Tracking',
            description: 'Monitor application status in real-time and never miss important deadlines.'
        },
        {
            icon: <CheckCircle2 />,
            title: 'Streamlined Process',
            description: 'Complete and submit applications to multiple colleges through one platform.'
        },
        {
            icon: <Users />,
            title: 'Expert Guidance',
            description: 'Access resources and personalized advice throughout your application journey.'
        }
    ];

export default function Features() {
    return (
        <div className="w-full items-center flex justify-center bg-primary-10 py-10 text-center px-5">
            <div className="max-w-7xl w-full">
                <div className="items-center justify-center flex flex-col gap-5">
                    <p className="text-3xl text-primary-main font-bold">Why Choose {SITE_CONFIG.NAME}</p>
                    <p className="text-md text-light-200">Our platform simplifies the college application process, saving you time and reducing stress.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-10">
                    {
                        features.map((feature, index) => (
                            <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
