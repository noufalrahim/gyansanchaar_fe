import { DashboardUserCard } from "@/components/Cards";
import { AboutMeSection, ApplicationSection, DocumentsSection } from "./";
import { useState } from "react";
import { ACTIVE_TABS } from "@/types/ActiveTabEnums";
import NotificationSection from "./Section/NotificationSection";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<string>(ACTIVE_TABS.APPLICATIONS);

  return (
    <div className='bg-primary-10 w-full flex flex-col items-center justify-center py-10'>
        <div className='max-w-7xl w-full'>
            <div className="flex flex-col md:flex-row gap-8 p-5 md:p-0">
                <DashboardUserCard activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab)} />
                <div className="flex-1">
                    {activeTab === ACTIVE_TABS.APPLICATIONS && <ApplicationSection />}
                    {activeTab === ACTIVE_TABS.ABOUT_ME && <AboutMeSection />}
                    {activeTab === ACTIVE_TABS.DOCUMENTS && <DocumentsSection />}
                    {activeTab === ACTIVE_TABS.NOTIFICATIONS && <NotificationSection /> }
                </div>
            </div>
        </div>
    </div>
  )
}
