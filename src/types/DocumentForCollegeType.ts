export type DocumentsForCollegeType = {
    id?: string;
    collegeId: string;
    rawDocumentId: string;
    rawDocument: {
        name: string;
    };
    courseId: string;
};