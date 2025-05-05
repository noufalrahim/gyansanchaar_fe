import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export default function QuickFactsCard() {
    return (
        <div>
            <Card className='bg-white'>
                <CardHeader>
                    <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Type</span>
                            <span className="font-medium text-primary-main">{'Private'}</span>
                        </li>
                        <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Tuition</span>
                            <span className="font-medium text-primary-main">{'$56,169'}</span>
                        </li>
                        <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Campus Size</span>
                            <span className="font-medium text-primary-main">{'8,180 acres'}</span>
                        </li>
                        <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Student-Faculty Ratio</span>
                            <span className="font-medium text-primary-main">{'5:1'}</span>
                        </li>
                        <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Graduation Rate</span>
                            <span className="font-medium text-primary-main">{'94%'}</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-gray-600">Financial Aid</span>
                            <span className="font-medium text-primary-main">{'70% of students receive aid'}</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
