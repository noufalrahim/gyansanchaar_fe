/* eslint-disable react-hooks/rules-of-hooks */
import { DialogModal } from '@/components/Modal';
import { useReadData } from '@/hooks/useReadData';
import { DocumentType, RawDocumentType } from '@/types';
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
import { Link } from 'react-router-dom';

export default function DocumentsSection() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user); 

  if(!user || !user.user){
    return;
  }

  const { data: rawDocumentData,
    // isLoading: rawDocumentIsLoading, isError: rawDocumentIsError 
  } = useReadData<RawDocumentType[]>('rawDocument', '/rawDocuments');
  const { data: uploadedDocuments, 
    // isLoading: uploadedIsLoading, isError: uploadedIsError,
  refetch } = useReadData<DocumentType[]>('documents', `/documents/document/user/${user.user.id}`);

  const handleUpload = async () => {
    if (!file || !selectedId) {
      toast({ title: "Please select a document type and upload a file" });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("userId", user.user!.id!);
      formData.append("rawDocumentId", selectedId);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/documents/document`, formData);
      if (response.data) {
        toast({ title: "File uploaded successfully" });
        setOpen(false);
        refetch();
      } else {
        toast({ title: "Upload failed", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Upload failed", variant: "destructive" });
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // if(!uploadedDocuments || !rawDocumentData || !uploadedIsLoading || !rawDocumentIsLoading || !uploadedIsError || !rawDocumentIsError) {
  //   return <h1>Loading...</h1>
  // }

  if(!uploadedDocuments || !rawDocumentData){
    return <h1>Loading..</h1>;  
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
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-gray-600">{(doc.size / 1024 / 1024).toFixed(2)} MB</td>
                      <td className="px-3 py-4 whitespace-nowrap text-right">
                     
                        <button className="text-red-700 hover:text-red-900 flex flex-row">
                        <Link to={''} download className="text-blue-700 hover:text-blue-900 mr-3">
                          <Download className="w-4 h-4" />
                        </Link>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {uploadedDocuments?.length === 0 && (
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
        <Select onValueChange={(value) => setSelectedId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Document" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {rawDocumentData?.map((item) => (
              <SelectItem key={item.id} value={item.id!}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="grid w-full gap-3">
          <Label htmlFor="document">Document</Label>
          <Input
            id="document"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <PrimaryButton label={isUploading ? 'Uploading...' : 'Upload'} onClick={handleUpload} loading={isUploading} />
      </DialogModal>
    </div>
  );
}
