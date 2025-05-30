import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useReadData } from '@/hooks/useReadData'
import { RootState } from '@/redux/store'
import { DashboardApplicationCard, DashboardApplicationCardSkeleton } from '@/components/Cards'
import { ChevronRight } from 'lucide-react';
import formatApplicationData from '@/lib/DataFormatter/applicationDataFormatter';
import { ApplicationJoinType } from '@/types/ApplicationJoinType';

export default function ApplicationSection() {
  const loggedInUser = useSelector((state: RootState) => state.user.user);

  const { data: applications, isLoading, isError, refetch } = useReadData<ApplicationJoinType[]>(
    'applicationsData',
    loggedInUser ? `/applications/fields/many?userId=${loggedInUser.id}` : null
  );

  const formattedApplicationData = formatApplicationData(applications);

  if (!loggedInUser) {
    return <div>Please login to view your applications.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">My Applications</h1>
        <Link
          to="/colleges"
          className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-smooth flex items-center"
        >
          New Application
          <ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-6">
        {formattedApplicationData && formattedApplicationData.length === 0 && (
          <div className="text-gray-600">No applications found.</div>
        )}
        {formattedApplicationData &&
          formattedApplicationData.map((application) => (
            <DashboardApplicationCard
              key={application.id}
              application={application}
              refetch={refetch}
            />
          ))}
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <DashboardApplicationCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}

