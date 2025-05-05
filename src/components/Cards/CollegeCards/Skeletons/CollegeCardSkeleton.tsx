import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CollegeCardSkeleton() {
  return (
    <div className='gap-2 flex flex-col'>
        <Skeleton count={1} className='h-56'/>
        <Skeleton count={0.5} className='h-7'/>
        <Skeleton count={0.3} className='h-5'/>
        <Skeleton count={1.5} className='h-5'/>
        <Skeleton count={1} className='h-10'/>
    </div>
  )
}
