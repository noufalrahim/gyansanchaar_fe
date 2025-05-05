import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function DashboardApplicationCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-up p-5 gap-5 flex flex-col">
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <Skeleton height={20} width={400} />
          <Skeleton height={20} width={200} />
        </div>
        <Skeleton height={20} width={200} />
      </div>
      <Skeleton height={20} width={200} />
    </div>
  );
}
