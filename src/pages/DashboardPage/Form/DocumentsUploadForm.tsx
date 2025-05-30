import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ApplicationType, DocumentType, UploadDocumentsType } from "@/types";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { DocumentItemCard } from "@/components/Cards";
import { useReadData } from "@/hooks/useReadData";
import { useCreateData } from "@/hooks/useCreateData";
import { useToast } from "@/hooks/use-toast";
import formatdocumentForCollegeData from "@/lib/DataFormatter/documentForCollegeDataFormatter";
import { DocumentForCollegeJoinType } from "@/types/DocumentForCollegeJoinType";
import formatUploadedDocumentsData from "@/lib/DataFormatter/uploadedDocumentForamtter";
import { UploadedDocumentsJoinType } from "@/types/UploadedDocumentsJoinType";

interface DocumentsUploadFormProps {
  application: ApplicationType | null;
  setOpen: (open: boolean) => void;
}
export default function DocumentsUploadForm({ application, setOpen }: DocumentsUploadFormProps) {

  const { toast } = useToast();

  const { data: documentsForCollegeData, isLoading: documentsForCollegeIsLoading, } = useReadData<DocumentForCollegeJoinType[]>('documentsForCollege', `/documents-for-colleges/fields/many?collegeId=${application?.collegeId}&courseId=${application?.courseId}`);
  const { data: uploadedDocumentsData, isLoading: uploadedDocumentsDataIsLoading, } = useReadData<UploadedDocumentsJoinType[]>('uploadedDocuments', `/uploaded-documents/fields/many?applicationId=${application?.id}`);
  const { data: documentsData, isLoading: documentsDataIsLoading } = useReadData<DocumentType[]>('documentsByUserId', `/documents/fields/many?userId=${application?.userId}`);
  const { mutate: UploadDocumentMutate, isPending: UploadDocumentMutateIsPending, isError: UploadDocumentIsError } = useCreateData<UploadDocumentsType[]>('/uploaded-documents/many');
    
  const formattedDocumentsForCollegeData = formatdocumentForCollegeData(documentsForCollegeData);
  const formattedUploadedDocumentsData = formatUploadedDocumentsData(uploadedDocumentsData);

  const applicationForm = useForm<{ [key: string]: string }>({
    defaultValues: {},
  });

  const onSubmit = async (values: { [value: string]: string }) => {
    const payload = Object.values(values).map((documentId) => ({
      documentId,
      applicationId: application?.id,
    }));

    console.log(payload);

    UploadDocumentMutate((payload as UploadDocumentsType[]), {
      onSuccess: () => {
        toast({
          title: "Documents Submitted",
          description: "Documents has been submitted successfully!",
        });
        setOpen(false);
      },
      onError: () => {
        toast({
          title: "Failed to Submit Documents",
        });
      }
    })
  };

  if (UploadDocumentIsError) return <p>An error occurred!</p>;
  if (!formattedDocumentsForCollegeData || documentsForCollegeIsLoading || uploadedDocumentsDataIsLoading) return <h1>Loading...</h1>;

  return (
    <Form {...applicationForm}>
      <form onSubmit={applicationForm.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {formattedDocumentsForCollegeData.map((doc, index) => (
          <DocumentItemCard
            key={index}
            doc={doc}
            isUploaded={!!(formattedUploadedDocumentsData && formattedUploadedDocumentsData.length > 0 && formattedUploadedDocumentsData!.some(upDocData => upDocData.document.documentFrame.id === doc.documentFrameId))}
            control={applicationForm.control}
            name={doc.id!}
            uploadedDocName={
              formattedUploadedDocumentsData!.find(
                upDocData => upDocData.document.documentFrame.id === doc.documentFrameId
              )?.document.name
            }
            documentsData={documentsData}
            isLoading={documentsDataIsLoading}
          />
        ))}
        <PrimaryButton label="Submit" className="w-full mt-5" type="submit" loading={UploadDocumentMutateIsPending} />
      </form>
    </Form>
  );
}
