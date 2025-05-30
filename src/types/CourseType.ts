import { CourseFrameType } from "./CourseFrameType";

export type CourseType = {
    id?: string;
    collegeId?: string;
    courseFrame: CourseFrameType;
    fees: number;
    eligibility: string;
    duration: string;
    entranceExam?: string;
};