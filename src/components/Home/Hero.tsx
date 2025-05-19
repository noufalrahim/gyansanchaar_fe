import collegeImage from '@/assets/college.avif'
import { ChevronRight } from 'lucide-react'
import PrimaryButton from '../Buttons/PrimaryButton'
import SecondaryButton from '../Buttons/SecondaryButton'
import { useNavigate } from 'react-router-dom'

export default function Hero() {

    const navigate = useNavigate();

    return (
        <div className="flex items-center max-w-7xl justify-center flex-col bg-white px-5 lg:flex-row xl:flex-row 2xl:flex-row gap-10">
            <div className='flex items-start justify-between flex-col w-full gap-10 lg:w-1/2 xl:w-1/2 2xl:w-1/2'>
                <div className='w-full flex flex-col text-left text-6xl font-semibold'>
                    <p className='text-primary-main'>Your College Journey</p>
                    <p className='text-primary-600'>Simplified</p>
                </div>
                <p className='text-light-200 text-xl'>Apply to top colleges, track your applications, and get personalized guidance throughout your admissions journey.Apply Now</p>
                <div className='gap-5 flex flex-row'>
                    <PrimaryButton label='Apply Now' trailIcon={<ChevronRight />} className='py-5 px-5 rounded-lg' onClick={() => navigate('/apply')}/>
                    <SecondaryButton label='Browse Colleges' className='py-5 px-5 rounded-lg' onClick={() => navigate('/colleges')}/>
                </div>
            </div>
            <div className='shadow-2xl w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 lg:h-[30rem] xl:h-[30rem] 2xl:h-[30rem]'>
                <img src={collegeImage} className='rounded-lg lg:h-full xl:h-full 2xl:h-full' />
            </div>
        </div>
    )
}
