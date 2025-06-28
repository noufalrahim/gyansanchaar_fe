import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Card, CardContent } from "../ui/card";
import { CourseJoinType } from '@/types';
import { useReadData } from '@/hooks/useReadData';
import { Loader } from '../Loader';
import formatCourseData from '@/lib/DataFormatter/courseDataFormatter';
import { useNavigate } from 'react-router-dom';

interface TableComponentProps {
    collegeId: string
};

export default function TableComponent({ collegeId }: TableComponentProps) {

    const { data, isLoading, isError } = useReadData<CourseJoinType[]>('courses', `/courses/fields/many?collegeId=${collegeId}`);

    const navigate = useNavigate();

    const coursesData = formatCourseData(data);
    console.log(coursesData);

    if (isLoading || !data) {
        return <div className="min-h-screen w-full items-center justify-center flex"><Loader /></div>
    };

    if (isError) {
        return <h1>An error occured!</h1>
    };

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-primary-main mb-6">Programs & Courses</h2>
            {
                coursesData && coursesData.map((c_data, index) => (
                    <div key={index} className='my-5'>
                        <p className='text-lg font-bold text-primary-main mb-6'>{index + 1}. {c_data.course_category.name} Courses</p>
                        <Card>
                            <CardContent className="pt-6">
                                <Table>
                                    <TableHeader className='text-gray-600'>
                                        <TableRow>
                                            <TableHead>Program Name</TableHead>
                                            <TableHead>Fees</TableHead>
                                            <TableHead>Eligibility</TableHead>
                                            <TableHead>Duration</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {c_data.courses.map((crs, index) => (
                                            <TableRow key={index}>
                                                <TableCell onClick={() => navigate(`/courses/${crs.courseFrame.id}`)} className="font-medium cursor-pointer hover:underline">{crs.courseFrame.name}</TableCell>
                                                <TableCell>₹{crs.fees}</TableCell>
                                                <TableCell>{crs.eligibility} Pass</TableCell>
                                                <TableCell>{crs.duration} Years</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                ))
            }
        </div>
    )
}
