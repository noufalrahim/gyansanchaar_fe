export type DocumentType = {
    id?: string;
    userId?: string;
    fileData: {
        type: string;
        data: number[];
    };
    size: number;
    name: number;
    rawDocumentId: string;
    uploadedAt: string;
};