import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { COLLEGE_INFO } from "@/constants/COLLEGE_INFO";


export default function AboutCollegeCard() {
  return (
    <div className="lg:col-span-2">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>About {'Massachusetts Institute of Technology'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6">
            Stanford University is a private research university in Stanford, California. The university was founded in 1885 by Leland and Jane Stanford in memory of their only child, Leland Stanford Jr., who had died of typhoid fever at age 15 the previous year.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {COLLEGE_INFO.map(({ icon: Icon, label, value }, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
                <Icon className="h-6 w-6 mx-auto text-primary-main mb-2" />
                <div className="text-sm text-gray-500">{label}</div>
                <div className="font-semibold text-primary-main">{value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
