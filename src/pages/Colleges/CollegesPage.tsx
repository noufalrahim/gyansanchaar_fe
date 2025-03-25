import { AppHeader } from '@/components/AppHeader'
import { CollegeCard } from '@/components/Cards'

export default function CollegesPage() {
    return (
        <div className='bg-primary-10 w-full flex flex-col items-center justify-center py-10'>
            <div className='max-w-7xl w-full'>
                <AppHeader />
            </div>
            <div className='max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
                <CollegeCard />
            </div>
        </div>
    )
}
