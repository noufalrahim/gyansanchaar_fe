import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CollegeCardShortSkeleton() {
  return (
    <div className='shadow-sm border border-light-100 rounded-md bg-white w-full justify-between p-5 flex gap-10 flex-col'>
      <div className='flex flex-row items-center justify-start w-full gap-5'>
        <div className='p-2 border border-light-100 rounded-md'>
          <Skeleton width={64} height={64} className='rounded-md' />
        </div>
        <div className='flex gap-2 items-start h-full flex-col justify-center'>
          <Skeleton width={80} height={16} />
          <Skeleton width={50} height={20} />
        </div>
      </div>
      <Skeleton width={'100%'} height={24} />
      <Skeleton width={'100%'} height={36} borderRadius={6} />
    </div>
  )
}
