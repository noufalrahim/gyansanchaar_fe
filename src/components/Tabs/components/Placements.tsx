import { Card, CardContent,  } from '@/components/ui/card'

export default function Placements() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Placement Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">96%</div>
              <p className="text-gray-600">Employment Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$125,000</div>
              <p className="text-gray-600">Average Starting Salary</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
              <p className="text-gray-600">Graduation Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <h3 className="text-xl font-bold text-blue-900 mb-4">Top Recruiters</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center bg-amber-800 text-white">
            <p className="font-medium">Apple</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center bg-yellow-900 text-white">
            <p className="font-medium">Google</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center bg-green-800 text-white">
            <p className="font-medium">Microsoft</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center bg-red-600 text-white">
            <p className="font-medium">Tech Mahindra</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center bg-gray-800  text-white">
            <p className="font-medium">Facebook</p>
          </div>
      </div>
    </div>
  )
}
