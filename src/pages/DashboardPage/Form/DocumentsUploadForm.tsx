import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ApplicationType, DocumentsForCollegeType, DocumentType, UploadDocumentsType } from "@/types";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { DocumentItemCard } from "@/components/Cards";
import { useReadData } from "@/hooks/useReadData";
import { useCreateData } from "@/hooks/useCreateData";
import { useToast } from "@/hooks/use-toast";

interface DocumentsUploadFormProps {
  application: ApplicationType | null;
  setOpen: (open: boolean) => void;
}
export default function DocumentsUploadForm({ application, setOpen }: DocumentsUploadFormProps) {

  const { toast } = useToast();

  const { data: documentsForCollegeData, isLoading: documentsForCollegeIsLoading, isError: documentsForCollegeIsError } = useReadData<DocumentsForCollegeType[]>('documentsForCollege', `/documentsForColleges/documentForCollege/college/${application?.collegeId}/course/${application?.courseId}`);
  const { data: uploadedDocumentsData, isLoading: uploadedDocumentsDataIsLoading, isError: uploadedDocumentsDataIsError } = useReadData<UploadDocumentsType[]>('uploadedDocuments', `/uploadedDocuments/uploadedDocument/application/${application?.id}`);
  const { data: documentsData, isLoading: documentsDataIsLoading } = useReadData<DocumentType[]>('documentsByUserId', `/documents/document/user/${application?.userId}`);
  const { mutate: UploadDocumentMutate, isPending: UploadDocumentMutateIsPending, isError: UploadDocumentIsError } = useCreateData<UploadDocumentsType[]>('/uploadedDocuments/uploadedDocument');

  const applicationForm = useForm<{ [key: string]: string }>({
    defaultValues: {},
  });

  const onSubmit = async (values: { [value: string]: string }) => {
    const payload = Object.values(values).map((documentId) => ({
      documentId,
      applicationId: application?.id,
    }));

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

  if (documentsForCollegeIsError || uploadedDocumentsDataIsError || UploadDocumentIsError) return <p>An error occurred!</p>;
  if (!documentsForCollegeData || documentsForCollegeIsLoading || uploadedDocumentsDataIsLoading) return <h1>Loading...</h1>;

  // uploadedDocumentsData?.map((doc) => {
  //   console.log("Doocc", doc)
  // })

  return (
    <Form {...applicationForm}>
      <form onSubmit={applicationForm.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {documentsForCollegeData.map((doc, index) => (
          <DocumentItemCard
            key={index}
            doc={doc}
            isUploaded={uploadedDocumentsData!.some(upDocData => upDocData.rawDocumentId === doc.rawDocumentId)}
            control={applicationForm.control}
            name={doc.id!}
            uploadedDocName={uploadedDocumentsData!.find(upDocData => upDocData.rawDocumentId === doc.rawDocumentId)?.name}           
            documentsData={documentsData}
            isLoading={documentsDataIsLoading}
          />
        ))}
        <PrimaryButton label="Submit" className="w-full mt-5" type="submit" loading={UploadDocumentMutateIsPending}/>
      </form>
    </Form>
  );
}
