interface FeatureCardProps {
    title: string;
    icon: React.ReactNode;
    description: string;
};

export default function FeatureCard({ title, icon, description }: FeatureCardProps) {
    return (
        <div className='bg-white items-center justify-center flex flex-col py-5 text-center gap-3 rounded-xl shadow-md px-5'>
            <div className='bg-primary-200 items-center justify-center flex p-3 rounded-full text-primary-main'>
                {icon}
            </div>
            <p className='text-lg text-primary-main font-bold'>{title}</p>
            <p>{description}</p>
        </div>
    )
}
