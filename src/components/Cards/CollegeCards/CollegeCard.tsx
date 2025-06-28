import { GraduationCap, MapPin } from 'lucide-react'
import PrimaryButton from '../../Buttons/PrimaryButton'
import { CollegeType } from '@/types'
import { useNavigate } from 'react-router-dom'
import { LocationType } from '@/types/LocationType'

interface CollegeCardProps {
    college: CollegeType,
    location: LocationType,
};

export default function CollegeCard({ college, location }: CollegeCardProps) {

    const navigate = useNavigate();
    console.log(college);
    return (
        <div className='shadow-sm border border-light-100 rounded-md bg-white w-full justify-between p-5 flex gap-5 flex-col h-[32rem]'>
        <img
          className='rounded-md w-full h-48 object-cover'
          src={college.coverImage}
          alt={college.name}
        />
            <div className='gap-3 flex flex-col'>
                <p className='text-primary-main text-xl font-bold line-clamp-1'>{college.name}</p>
                <div className='text-light-200 flex flex-row items-center text-center gap-2 text-md'>
                    <MapPin size={16} />
                    <p>{location.place}, {location.state}</p>
                </div>
                <p className='text-light-200 text-sm line-clamp-2'>
                    {college.description}
                </p>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='text-primary-main flex flex-row gap-2 justify-between items-center'>
                        <GraduationCap size={20} />
                        <p className='text-black'>Rank: #{college.rank}</p>
                    </div>
                </div>
            </div>
            <PrimaryButton label='View Details' onClick={() => navigate(`/colleges/${college.id!}`)} />
        </div>
    )
}
