import { TABS_TRIGGER_VALUES } from "@/constants/TABS_TRIGGER";
import { TabsContent } from "../ui/tabs";
import { Admissions, Campus, Courses, Overview, Placements, Reviews } from "./components";
import { CollegeType } from "@/types";

interface TabsComponentProps {
  college: CollegeType;
}

export default function TabsComponent({college}: TabsComponentProps) {
  return (
    <div>
      <TabsContent value={TABS_TRIGGER_VALUES.OVERVIEW} className="py-5">
        <Overview college={college}/>
      </TabsContent>
      <TabsContent value={TABS_TRIGGER_VALUES.COURSES} className="py-5">
        <Courses collegeId={college.id!}/>
      </TabsContent>
      <TabsContent value={TABS_TRIGGER_VALUES.ADMISSION} className="py-5">
        <Admissions collegeId={college.id!}/>
      </TabsContent>
      <TabsContent value={TABS_TRIGGER_VALUES.PLACEMENTS} className="py-5">
        <Placements collegeId={college.id!}/>
      </TabsContent>
      <TabsContent value={TABS_TRIGGER_VALUES.CAMPUS} className="py-5">
        <Campus collegeId={college.id!}/>
      </TabsContent>
      <TabsContent value={TABS_TRIGGER_VALUES.REVIEWS} className="py-5">
        <Reviews />
      </TabsContent>
    </div>
  )
}
