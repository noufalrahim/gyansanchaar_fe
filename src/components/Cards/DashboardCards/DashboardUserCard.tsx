import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { avatarGenerator } from '@/lib/AvatarGenerator';
import { cn } from '@/lib/utils'
import { RootState } from '@/redux/store';
import { Settings, LogOut, Layers, Bell, User, File } from 'lucide-react'
import { useSelector } from 'react-redux';

interface DashboardUserCardProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function DashboardUserCard({ activeTab, setActiveTab }: DashboardUserCardProps) {


    const user = useSelector((state: RootState) => state.user);

    const notifications = [
        { id: 1, message: 'New application received', read: false },
        { id: 2, message: 'Your application has been approved', read: true },
        { id: 3, message: 'New message from your counselor', read: false },
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 lg:w-72 shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-light-100 overflow-hidden sticky top-28">
                    <div className="p-5 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-4">
                                <Avatar>
                                    <AvatarFallback>
                                        {avatarGenerator(user.user!.name!)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <div className="font-semibold text-blue-900">{user.user!.name}</div>
                                <div className="text-sm text-gray-500">{user.user!.email}</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-2">
                        <button
                            className={cn(
                                "w-full flex items-center px-3 py-2 rounded-lg text-left transition-smooth mb-1",
                                activeTab === 'aboutMe'
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            )}
                            onClick={() => setActiveTab('aboutMe')}
                        >
                            <User className="w-5 h-5 mr-3" />
                            <span>About Me</span>
                        </button>

                        <button
                            className={cn(
                                "w-full flex items-center px-3 py-2 rounded-lg text-left transition-smooth mb-1",
                                activeTab === 'applications'
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            )}
                            onClick={() => setActiveTab('applications')}
                        >
                            <Layers className="w-5 h-5 mr-3" />
                            <span>My Applications</span>
                        </button>

                        <button
                            className={cn(
                                "w-full flex items-center px-3 py-2 rounded-lg text-left transition-smooth mb-1",
                                activeTab === 'documents'
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            )}
                            onClick={() => setActiveTab('documents')}
                        >
                            <File className="w-5 h-5 mr-3" />
                            <span>Documents</span>
                        </button>

                        <button
                            className={cn(
                                "w-full flex items-center px-3 py-2 rounded-lg text-left transition-smooth mb-1",
                                activeTab === 'notifications'
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            )}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Bell className="w-5 h-5 mr-3" />
                            <span>Notifications</span>
                            <div className="ml-auto bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                {notifications.filter(n => !n.read).length}
                            </div>
                        </button>

                        <button
                            className={cn(
                                "w-full flex items-center px-3 py-2 rounded-lg text-left transition-smooth mb-1",
                                activeTab === 'saved'
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            )}
                            onClick={() => setActiveTab('saved')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            <span>Saved Colleges</span>
                        </button>

                        <button
                            className={cn(
                                "w-full flex items-center px-3 py-2 rounded-lg text-left transition-smooth mb-1",
                                activeTab === 'settings'
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            )}
                            onClick={() => setActiveTab('settings')}
                        >
                            <Settings className="w-5 h-5 mr-3" />
                            <span>Settings</span>
                        </button>
                    </div>

                    <div className="p-4 mt-2">
                        <button
                            className="w-full flex items-center justify-center px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-smooth"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}   