import { CollegeType } from "./CollegeType";
import { CourseType } from "./CourseType";
import { UserType } from "./UserTypes";

export interface ApplicationType {
    id?: string;
    userId: string;
    collegeId: string;
    courseId: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    user?: UserType;
    course?: CourseType;
    college?: CollegeType;
}