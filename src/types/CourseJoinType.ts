import { CourseCategoryType } from "./CourseCategoryType";
import { CourseFrameType } from "./CourseFrameType";
import { CourseType } from "./CourseType";

export type CourseJoinType = {
    course_category: CourseCategoryType;
    course_frame: CourseFrameType;
    course: CourseType;
};