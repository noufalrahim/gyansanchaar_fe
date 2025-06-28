import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Clock,
    GraduationCap,
    BookOpen,
    DollarSign,
} from 'lucide-react';
import { useReadData } from '@/hooks/useReadData';
import { CollegeType, CourseCategoryType, CourseFrameType, CourseType } from '@/types';
import { CarouselComponent } from '@/components/CarouselComponent';
import { CarouselItem } from '@/components/ui/carousel';
import { CollegeCard } from '@/components/Cards';

export default function CourseDetailsPage () {
    const { id } = useParams();

    const { data } = useReadData<{
        course_frame: CourseFrameType,
        course_category: CourseCategoryType,
    }[]>('course-frames', `/course-frames/fields/many?id=${id}`);
    
    const { data: collegesData } = useReadData<{
        college: CollegeType,
        course: CourseType,
    }[]>('colleges', `/colleges/fields/linked?courseFrameId=${id}`);

    console.log(collegesData);

    const course = data && data[0];

    if (!course || !collegesData) {
        return (
            <div className="min-h-screen bg-gray-50 w-full">
                <div className="pt-32 pb-16 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
                    <Link to="/courses">
                        <Button className="text-white">Back to Courses</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <section className="pt-10 pb-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.course_frame.name}</h1>
                        <Badge className="mb-4 text-white">{course.course_frame.level}</Badge>
                        <p className="text-xl text-gray-600 mb-6">{course.course_frame.description}</p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center text-gray-600">
                                <Clock className="h-5 w-5 mr-2" />
                                Duration: {course.course_frame.duration} Years
                            </div>
                            <div className="flex items-center text-gray-600">
                                <GraduationCap className="h-5 w-5 mr-2" />
                                Category: {course.course_category.name}
                            </div>
                            <div className="flex items-center text-green-600">
                                <DollarSign className="h-5 w-5 mr-2" />
                                Avg. Salary: {course.course_frame.averageSalary}
                            </div>
                        </div>
                    </div>

                    <img
                        src={course.course_frame.image}
                        alt={course.course_frame.name}
                        className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
                    />
                </div>
            </section>

            <section className="pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BookOpen className="h-5 w-5 mr-2" />
                                About This Course
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">{course.course_frame.description}</p>
                        </CardContent>
                    </Card>
                </div>
            </section>
            <section className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <p className='text-primary-main text-2xl font-bold text-center'>Colleges offering {course.course_frame.name}</p>
                    <CarouselComponent>
                        {collegesData && collegesData.map((record, index) => (
                            <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
                            <CollegeCard college={record.college} location={record.location} />
                          </CarouselItem>
                          
                        ))}
                    </CarouselComponent>
                </div>
            </section>
        </div>
    );
};
