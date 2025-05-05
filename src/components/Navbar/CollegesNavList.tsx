import { useState } from "react";

export default function CollegesNavList() {
  const courses = [
    'Engineering',
    'Medical',
    'Management',
    'Commerce & Banking',
    'Science',
    'Hotel Management'
  ];

  const courseColleges: { [key: string]: string[] } = {
    Engineering: ['IIT Bombay', 'NIT Trichy', 'BITS Pilani', 'NIT Calicut', 'IIT Madras'],
    Medical: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER', 'AIIMS Bhopal'],
    Management: ['IIM Ahmedabad', 'XLRI', 'ISB Hyderabad', 'IIM Banglore'],
    'Commerce & Banking': ['SRCC', 'Loyola College', 'Christ University'],
    Science: ['IISc Bangalore', 'St. Stephen’s College', 'Madras Christian College'],
    'Hotel Management': ['IHM Delhi', 'IHM Mumbai', 'WelcomeGroup Manipal']
  };

  const [hoveredCourse, setHoveredCourse] = useState<string | null>('Engineering');

  return (
    <div className="gap-3 md:w-[400px] lg:w-[700px] lg:grid-cols-[.75fr_1fr] bg-white p-5 flex flex-row">
      <div className="w-1/3">
        {courses.map((course, index) => (
          <p
            key={index}
            className="text-sm p-2 cursor-pointer hover:bg-primary-main hover:text-white rounded-md"
            onMouseEnter={() => setHoveredCourse(course)}
          >
            {course}
          </p>
        ))}
      </div>

      <div className="w-2/3 transition-all duration-300">
        {hoveredCourse && (
          <div className="space-y-2">
            <div className="grid grid-cols-3">
              {courseColleges[hoveredCourse].map((college, idx) => (
                <p key={idx} className="text-sm text-gray-700 p-2 rounded-md cursor-pointer hover:bg-gray-100">{college}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
