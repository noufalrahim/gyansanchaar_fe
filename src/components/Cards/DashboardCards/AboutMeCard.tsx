interface AboutMeCardProps {
    title: string;
    items: {
        label: string;
        value: string;
    }[];
}

export default function AboutMeCard({ title, items }: AboutMeCardProps) {
  return (
    <div className='w-full bg-white rounded-lg p-4 shadow-sm border border-light-100 gap-4 flex flex-col'>
        <h2 className='text-lg font-bold text-primary-main'>{title}</h2>
        <div className='grid md:grid-cols-3 gap-4 grid-cols-1'>
                {items.map((item) => (
                    <div key={item.label}>
                        <p className='text-sm text-light-200'>{item.label}</p>
                        <h3 className='text-md font-bold text-primary-main'>{item.value}</h3>
                    </div>
                ))}            
        </div>
    </div>
  )
}
