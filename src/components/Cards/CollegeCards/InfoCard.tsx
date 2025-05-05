import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'



interface InfoCardProps {
    data: string [];
};

export default function InfoCard({data}: InfoCardProps) {
    return (
        <Card className='bg-white'>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary-main" />
                    Campus Facilities
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {data.map((facility, index) => (
                        <li key={index} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
                            {facility}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
