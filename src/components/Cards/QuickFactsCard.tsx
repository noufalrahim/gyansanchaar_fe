// import { useReadData } from '@/hooks/useReadData'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { FactsAndStatisticType } from '@/types';

// interface QuickFactsCardProps {
//     collegeId: string;
// };

export default function QuickFactsCard(
    // { collegeId }: QuickFactsCardProps
) {

    // const { data: factsData, 
    //     // isLoading: factsDataIsLoading 
    // } = useReadData<FactsAndStatisticType[]>('factAndStatistics', `/facts-and-statistics/field/collegeId/${collegeId}`);

    const factsData: FactsAndStatisticType[] = [
        {
            value: '100+ acres',
            label: 'Campus Size',
        },
        {
            value: '125+',
            label: 'Courses'
        },
        {
            value: '250+',
            label: 'Faculty Members',
        },
        {
            value: '15+',
            label: 'Centres of Excellence'
        }
    ];

    return (
        <div>
            <Card className='bg-white'>
                <CardHeader>
                    <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {
                            factsData && factsData.map((fact, index) => (
                                <li className="flex justify-between items-center pb-2 border-b border-gray-100" key={index}>
                                    <span className="text-gray-600">{fact.label}</span>
                                    <span className="font-medium text-primary-main">{fact.value}</span>
                                </li>
                            ))
                        }
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
