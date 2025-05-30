import { AboutCollegeCard } from '@/components/Cards'
import QuickFactsCard from '@/components/Cards/QuickFactsCard'
import { CollegeType } from '@/types'

interface OverviewProps {
  college: CollegeType;
};

export default function Overview({college}: OverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
      <AboutCollegeCard college={college}/>
      <QuickFactsCard 
      collegeId={college.id!}
      />
    </div>
  )
}
