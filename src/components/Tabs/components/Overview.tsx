import { AboutCollegeCard } from '@/components/Cards'
import QuickFactsCard from '@/components/Cards/QuickFactsCard'

export default function Overview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
      <AboutCollegeCard />
      <QuickFactsCard />
    </div>
  )
}
