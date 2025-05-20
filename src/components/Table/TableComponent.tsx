import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Card, CardContent } from "../ui/card";
// import { useReadData } from '@/hooks/useReadData';
import { CourseType } from '@/types';
// import { Loader } from '../Loader';
// import { getCourseKeyByLabel } from '@/constants/COURSES';

interface TableComponentProps {
    collegeId: string
};

export default function TableComponent({ collegeId }: TableComponentProps) {
    console.log(collegeId);

    // const { data, isLoading, isError } = useReadData<CourseType[]>('courses', `/courses/field/collegeId/${collegeId}`);

    // if (isLoading || !data) {
    //     return <div className="min-h-screen w-full items-center justify-center flex"><Loader /></div>
    // };

    // if (isError) {
    //     return <h1>An error occured!</h1>
    // };

    const data: CourseType[] = [
        {
            course: 'B.Tech. (Computer Science and Engineering) CSE',
            eligibility: 'Maths,Physics,Chemistry',
            duration: '4',
            fees: 190000,
        },
        {
            course: 'B.Tech. CSE - (Artificial Intelligence Machine Learning) AIML',
            eligibility: 'Maths,Physics,Chemistry',
            duration: '4',
            fees: 190000,
        }, {
            course: 'B.Tech. CSE - (Data Science) DS',
            eligibility: 'Maths,Physics,Chemistry',
            duration: '4',
            fees: 190000,
        }, {
            course: 'B.Tech. CSE - (Cyber Security) CS',
            eligibility: 'Maths,Physics,Chemistry',
            duration: '4',
            fees: 190000,
        }, {
            course: 'B.Tech. (Information Technology) IT',
            eligibility: 'Maths,Physics,Chemistry',
            duration: '4',
            fees: 190000,
        }, {
            course: 'B.Tech. (Electronics and Communication Engineering) ECE',
            eligibility: 'Maths,Physics,Chemistry',
            duration: '4',
            fees: 190000,
        },
        {
            course: 'BBA (General) (Bachelor of Business Administration)',
            eligibility: 'Intermediate or 10+2 with 50% Marks',
            duration: '4',
            fees: 190000,
        },
        {
            course: 'BBA (Business Analytics)(Bachelor of Business Administration)',
            eligibility: 'Intermediate or 10+2 with 50% Marks',
            duration: '4',
            fees: 190000,
        },
        {
            course: 'B.Com.',
            eligibility: 'Intermediate or 10+2 with 50% Marks',
            duration: '4',
            fees: 190000,
        },
        {
            course: 'B.Sc. (Digital Forensics)',
            eligibility: 'Biology/Maths,Physics,Chemistry',
            duration: '4',
            fees: 190000,
        },{
            course: 'BCA (Bachelor of Computer application)',
            eligibility: 'Intermediate or 10+2 with 50% Marks',
            duration: '4',
            fees: 190000,
        },
    ]

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-primary-main mb-6">Programs & Courses</h2>
            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader className='text-gray-600'>
                            <TableRow>
                                <TableHead>Program Name</TableHead>
                                <TableHead>Fees</TableHead>
                                <TableHead>Eligibility</TableHead>
                                <TableHead>Duration</TableHead>
                                {/* <TableHead>Entrance Exam</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((course, index) => (
                                <TableRow key={index}>
                                    {/* <TableCell className="font-medium">{getCourseKeyByLabel(course.course)}</TableCell> */}
                                    <TableCell className="font-medium">{course.course}</TableCell>
                                    <TableCell>₹{course.fees}</TableCell>
                                    <TableCell>{course.eligibility} Pass</TableCell>
                                    <TableCell>{course.duration}</TableCell>
                                    {/* <TableCell>{course.entranceExam}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
