import PrimaryButton from '@/components/Buttons/PrimaryButton'
import { CollegeType } from '@/types'

interface CollegeCardShortProps {
  college: CollegeType
  onClick: () => void
}

export default function CollegeCardShort({ college, onClick }: CollegeCardShortProps) {
  return (
    <div className='shadow-sm border border-light-100 rounded-md bg-white w-full justify-between p-5 flex gap-5 flex-col'>
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='p-2 border border-light-100 rounded-md'>
          <img
            src={
              // college.logo || 
              'https://brand.mit.edu/sites/default/files/styles/image_text_2x/public/2023-08/MIT-lockup-3line-red.png?itok=MJP9Djff'
            }
            className='w-16 h-16 rounded-md object-cover'
            alt={`${college.name} Logo`}
          />
        </div>
        <div className='flex gap-4'>
          <div className='text-gray-600 font-medium'>{
            // college.courseCount || 
            0
          } Courses</div>
        </div>
      </div>
      <div className='text-xl font-semibold text-gray-800'>{college.name}</div>
      <PrimaryButton label='View Details' onClick={onClick} />
    </div>
  )
}
