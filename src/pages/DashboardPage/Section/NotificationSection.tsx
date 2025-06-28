import { cn } from "@/lib/utils";

export default function NotificationSection() {

    const notifications = [
        {
            id: '1',
            title: 'Document Verified',
            message: 'Your transcripts for Stanford University have been verified.',
            date: '2 hours ago',
            read: false
        },
        {
            id: '2',
            title: 'Application Update',
            message: 'MIT has requested additional information for your application.',
            date: '1 day ago',
            read: false
        },
        {
            id: '3',
            title: 'Payment Confirmation',
            message: 'Your payment for Yale University application has been received.',
            date: '3 days ago',
            read: true
        },
        {
            id: '4',
            title: 'Application Deadline',
            message: 'Reminder: Harvard University application deadline is in 5 days.',
            date: '5 days ago',
            read: true
        }
    ];


    return (
        <div>
            <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-blue-900">Notifications</h1>
                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-smooth"
                    >
                        Mark All as Read
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={cn(
                                    "p-5 flex",
                                    notification.read ? 'bg-white' : 'bg-blue-50'
                                )}
                            >
                                <div className={cn(
                                    "w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0",
                                    notification.read ? 'bg-gray-300' : 'bg-blue-600'
                                )} />
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                                        <div className="font-medium text-blue-900">{notification.title}</div>
                                        <div className="text-xs text-gray-500">{notification.date}</div>
                                    </div>
                                    <div className="text-gray-600 text-sm">{notification.message}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
