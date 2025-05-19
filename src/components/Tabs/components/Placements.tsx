import { Card, CardContent, } from '@/components/ui/card'
import { useReadData } from '@/hooks/useReadData';
import { PlacementCompanyType, PlacementType } from '@/types';

interface PlacementsProps {
  collegeId: string;
}

export default function Placements({ collegeId }: PlacementsProps) {

  const { data: placementData,
    // isLoading: factsDataIsLoading 
  } = useReadData<PlacementType[]>('placements', `/placements/field/collegeId/${collegeId}`);

  const { data: placementCompaniesData,
    // isLoading: placementCompaniesDataIsLoading 
  } = useReadData<PlacementCompanyType[]>('placementCompanies', `/placement-companies/field/collegeId/${collegeId}`);

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Placement Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {
          placementData && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ₹{placementData && placementData[0]?.averageSalary}
                  </div>
                  <p className="text-gray-600">Average Salary</p>
                </div>
              </CardContent>
            </Card>
          )
        }
        {
          placementData && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">₹{placementData[0]?.highestSalary}</div>
                  <p className="text-gray-600">Highest Salary</p>
                </div>
              </CardContent>
            </Card>
          )
        }
        {
          placementData && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{placementData[0]?.noOfStudentsPlaced}</div>
                  <p className="text-gray-600">No of Students Placed</p>
                </div>
              </CardContent>
            </Card>
          )
        }
        {
          placementData && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">₹{placementData[0]?.placementRate}</div>
                  <p className="text-gray-600">Placement Rate</p>
                </div>
              </CardContent>
            </Card>
          )
        }
      </div>
      {placementCompaniesData && (
        <div>
          <h3 className="text-xl font-bold text-blue-900 mb-4">Top Recruiters</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {
              placementCompaniesData.map((plcmt, index) => (
                <div className="bg-gray-50 rounded-lg p-4 text-center bg-gray-800  text-white" key={index}>
                  <p className="font-medium">{plcmt.name}</p>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}
