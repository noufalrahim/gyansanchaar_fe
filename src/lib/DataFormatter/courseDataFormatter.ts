import { CourseCategoryType, CourseJoinType, CourseType } from "@/types";

export default function formatCourseData(courseData: CourseJoinType[] | undefined) {
  if (!courseData) return null;

  const categoryMap = new Map<string, {
    course_category: CourseCategoryType;
    courses: CourseType[];
  }>();

  for (const item of courseData) {
    const { course, course_frame, course_category } = item;
    const categoryId = course_category.id!;

    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, {
        course_category,
        courses: [],
      });
    }

    categoryMap.get(categoryId)!.courses.push({
      ...course,
      courseFrame: {
        ...course_frame,
      },
    });
  }

  return Array.from(categoryMap.values());
}
