import { ApplicationType } from "./ApplicationType";
import { CollegeType } from "./CollegeType";
import { CourseFrameType } from "./CourseFrameType";
import { CourseType } from "./CourseType";

export type ApplicationJoinType = {
    application: ApplicationType;
    course: CourseType;
    college: CollegeType;
    course_frame: CourseFrameType;
};