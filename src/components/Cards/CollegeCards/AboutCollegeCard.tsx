import { CollegeType, SnapshotType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
// import { useReadData } from "@/hooks/useReadData";
// import IconRenderer from "@/lib/IconRenderer";
import { Bed, Bus, Trophy } from "lucide-react";
import React from "react";

interface AboutCollegeCardProps {
  college: CollegeType;
};

export default function AboutCollegeCard({ college }: AboutCollegeCardProps) {

  // const { data } = useReadData<SnapshotType[]>('snapshotsDatas', `/institute-snapshots/field/collegeId/${college.id}`);

  const data: SnapshotType[] = [{
    value: '2500',
    label: 'Bed Hostel Facility',
    iconName: Bed,
  },
  {
    value: '70+',
    label: 'Buses',
    iconName: Bus
  },
  {
    value: '25+',
    label: 'Bed Homeopathy Hospital',
    iconName: Bed,
  },
  {
    value: '22+',
    label: 'Sports Facilities',
    iconName: Trophy
  }
  ];

  return (
    <div className="lg:col-span-2">
      <Card className="bg-white">
        <CardHeader>
          
          <CardTitle>About {college.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6">
            {college.description}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {data && data.length > 0 && data.map(({ iconName, label, value }, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
                {/* {iconName && <iconName className="h-6 w-6 mx-auto text-primary-main mb-2" />} */}
                {iconName && React.createElement(iconName, { className: "h-6 w-6 mx-auto text-primary-main mb-2" })}
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
