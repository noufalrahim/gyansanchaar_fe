/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { DocumentsForCollegeType, DocumentType } from '@/types';
import { CheckCircle, Clock, DownloadIcon, Edit3, Loader2 } from 'lucide-react'

import { Controller } from "react-hook-form";

interface DocumentItemCardProps {
  doc: DocumentsForCollegeType;
  isUploaded: boolean;
  control: any;
  name: string;
  documentsData?: DocumentType[];
  isLoading?: boolean;
  uploadedDocName: string | undefined;
}

export default function DocumentItemCard({
  doc,
  isUploaded,
  control,
  name,
  documentsData,
  isLoading,
  uploadedDocName
}: DocumentItemCardProps) {

  return (
    <div className="w-full bg-light-100 p-3 rounded-md flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-3">
        {isUploaded ? (
          <CheckCircle className="text-green-600" />
        ) : (
          <Clock className="text-yellow-600" />
        )}
        <div className="items-start flex justify-center flex-col">
          {isUploaded ? (
            <p className="text-primary-main text-md">{uploadedDocName || 'document.pdf'}</p>
          ) : (
            <p className={cn(isUploaded ? 'text-[12px]' : 'text-md')}>
              {doc.documentFrame.name}  
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row items-start gap-2">
        {isUploaded ? (
          <>
            <DownloadIcon className="text-primary-main hover:text-primary-600" />
            <Edit3 className="text-red-800 hover:text-red-600" />
          </>
        ) : (
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Document" />
                </SelectTrigger>
                {(
                  <SelectContent className="bg-white max-w-[150px]">
                    {documentsData?.map((item) => {
                      return (
                        (
                          <SelectItem key={item.id} value={item.id!}>
                            {item.name}
                          </SelectItem>
                        )
                      )
                    })}
                    {
                      isLoading && (
                        <div className='h-10 items-center flex justify-center'>
                          <Loader2 className="animate-spin text-primary-main" />
                        </div>
                      )
                    }
                  </SelectContent>
                )}
              </Select>
            )}
          />
        )}
      </div>
    </div>
  );
}
