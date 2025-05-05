import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Card, CardContent } from "../ui/card";
import { useReadData } from '@/hooks/useReadData';
import { CourseType } from '@/types';
import { Loader } from '../Loader';

interface TableComponentProps {
    collegeId: string
};

export default function TableComponent({ collegeId }: TableComponentProps) {

    const { data, isLoading, isError } = useReadData<CourseType[]>('courses', `/courses/course/college/${collegeId}`);


    if (isLoading || !data) {
        return <div className="min-h-screen w-full items-center justify-center flex"><Loader /></div>
    };

    if (isError) {
        return <h1>An error occured!</h1>
    };

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
                                <TableHead>Entrance Exam</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((course, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{course.course}</TableCell>
                                    <TableCell>{course.fees}</TableCell>
                                    <TableCell>{course.eligibility} Pass</TableCell>
                                    <TableCell>{course.duration}</TableCell>
                                    <TableCell>{course.entranceExam}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
