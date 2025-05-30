/* eslint-disable react-hooks/rules-of-hooks */
import { DialogModal } from '@/components/Modal';
import { useReadData } from '@/hooks/useReadData';
import { DocumentType, DocumentFrameType } from '@/types';
import { ChevronRight, FileText, Download } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useCreateData } from '@/hooks/useCreateData';

export default function DocumentsSection() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user);

  if (!user || !user.user) {
    return <p>Please login to view your documents.</p>;
  }

  const { data: documentsFrameData } = useReadData<DocumentFrameType[]>('documentsFrame', '/documents-frames');
  const { data: uploadedDocuments, refetch } = useReadData<DocumentType[]>('documents', `/documents/fields/many?userId=${user.user.id}`);

  const { mutate: createDocumentMutate, isPending: createDocumentIsPending } = useCreateData<DocumentType>('/documents');

  const handleUpload = async () => {
    if (!file) {
      toast({ title: "No file selected", description: "Please select a file to upload", variant: "destructive" });
      return;
    }
    if (!selectedId) {
      toast({ title: "No document selected", description: "Please select a document type", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const url = `${import.meta.env.VITE_CLOUDINARY_API}?resource_type=auto`;

      const res = await axios.post(url, formData);

      createDocumentMutate({
        name: file.name,
        documentUrl: res.data.secure_url,
        publicId: res.data.public_id,
        format: res.data.format,
        resourceType: res.data.resource_type,
        size: file.size.toString(),
        documentFrameId: selectedId,
        userId: user.user!.id!,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          refetch();
        },
        onError: (err) => {
          console.log(err);
        }
      }
      );

      toast({ title: "Upload successful", description: `${file.name} uploaded successfully` });
      setFile(null);
      setSelectedId(undefined);
      setOpen(false);
      refetch();
    } catch (err) {
      console.error("File upload failed", err);
      toast({ title: "Upload failed", description: "An error occurred during file upload", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  if (!uploadedDocuments || !documentsFrameData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-900">My Documents</h1>
          <button
            className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-smooth flex items-center"
            onClick={() => setOpen(true)}
          >
            Upload New Document
            <ChevronRight className="ml-1 w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Uploaded Documents</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded On</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {uploadedDocuments.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-gray-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-gray-600">
                        {new Date(doc.uploadedAt!).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-gray-600">{(parseInt(doc.size) / 1024 / 1024).toFixed(2)} MB</td>
                      <td className="px-3 py-4 whitespace-nowrap text-right">
                        <a href={doc.documentUrl} download={doc.name} className="text-blue-700 hover:text-blue-900 mr-3 flex items-center">
                          <Download className="w-4 h-4" />
                          <span className="sr-only">Download {doc.name}</span>
                        </a>
                        {/* Delete or other actions can be added here */}
                      </td>
                    </tr>
                  ))}
                  {uploadedDocuments.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">
                        No documents uploaded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <DialogModal open={open} setOpen={setOpen} title="Upload Document" description="Upload New Document">
        <Select onValueChange={(value) => setSelectedId(value)} value={selectedId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Document Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {documentsFrameData.map((item) => (
              <SelectItem key={item.id} value={item.id!}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="grid w-full gap-3 mt-4">
          <Label htmlFor="document">Document</Label>
          <Input
            id="document"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <PrimaryButton label={isUploading ? 'Uploading...' : 'Upload'} onClick={handleUpload} loading={isUploading || createDocumentIsPending} />
      </DialogModal>
    </div>
  );
}


 // const handleUpload = async () => {
  //   if (!file || !selectedId) {
  //     toast({ title: "Please select a document type and upload a file" });
  //     return;
  //   }

  //   try {
  //     setIsUploading(true);
  //     const formData = new FormData();
  //     formData.append("pdf", file);
  //     formData.append("userId", user.user!.id!);
  //     formData.append("documentFrameId", selectedId);

  //     console.log('FormData:', Array.from(formData.entries()));
      
  //     const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/documents`, 
  //       formData,
  //       {
  //         headers: {
  //           'x-auth-token': localStorage.getItem('token'),
  //         },
  //       }
  //     );
  //     if (response.data) {
  //       toast({ title: "File uploaded successfully" });
  //       setOpen(false);
  //       refetch();
  //     } else {
  //       toast({ title: "Upload failed", variant: "destructive" });
  //     }
  //   } catch (error) {
  //     toast({ title: "Upload failed", variant: "destructive" });
  //     console.error(error);
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };