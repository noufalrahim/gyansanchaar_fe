import { CourseCategoryType } from "./CourseCategoryType";

export type CourseFrameType = {
    id?: string;
    name: string;
    duration: string;
    courseCategoryId: string;
    courseCategory: CourseCategoryType;
    level: string;
    subheader: string;
    averageSalary: string;
    image: string;
    description: string;
};