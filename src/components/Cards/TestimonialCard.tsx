import { SITE_CONFIG } from "@/constants/SITE_CONFIG";

export default function TestimonialCard() {
  return (
    <div className='bg-primary-10 w-full flex flex-col gap-5 p-5 shadow-md rounded-xl'>
      <div className='flex flex-row w-full items-center justify-start gap-2'>
        <div className='bg-primary-200 items-center justify-center flex h-10 w-10 rounded-full text-primary-main'>
          JS
        </div>
        <p className='text-md text-primary-main'>Jamie Smith</p>
      </div>
      <p className='text-light-200 italic'>
        "{SITE_CONFIG.NAME} helped me organize all my applications in one place. I could track deadlines and requirements easily, which took away so much stress!"
      </p>
    </div>
  )
}
