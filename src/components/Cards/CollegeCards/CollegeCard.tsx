import { GraduationCap, MapPin } from 'lucide-react'
import PrimaryButton from '../../Buttons/PrimaryButton'
import { CollegeType } from '@/types'
import { useNavigate } from 'react-router-dom'

interface CollegeCardProps {
    college: CollegeType,
};

export default function CollegeCard({college}: CollegeCardProps) {

    const navigate = useNavigate();

    return (
        <div className='shadow-sm border border-light-100 rounded-md bg-white w-full justify-between p-5 flex gap-5 flex-col'>
            <img className='rounded-md' src={college.coverImage}/>
            <div className='gap-3 flex flex-col'>
                {/* <div className='flex flex-row justify-between items-center'> */}
                    <p className='text-primary-main text-xl font-bold'>{college.name}</p>
                    {/* <Heart className='text-primary-main'/> */}
                {/* </div> */}
                <div className='text-light-200 flex flex-row items-center text-center gap-2 text-md'>
                    <MapPin size={16} />
                    <p>{college.location}</p>
                </div>
                <p className='text-light-200 text-sm'>{college.description}</p>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='text-primary-main flex flex-row gap-2 justify-between items-center'>
                        <GraduationCap size={20} />
                        <p className='text-black'>Rank: #{college.rank}</p>
                    </div>
                </div>
            </div>
            <PrimaryButton label='View Details' onClick={() => navigate(`/colleges/${college.id!}`)}/>
        </div>
    )
}
