import { AppHeader } from "@/components/AppHeader";
import { CollegeCardShortSkeleton } from "@/components/Cards";
import CollegeCardShort from "@/components/Cards/CollegeCards/CollegeCardShort";
import { DialogModal } from "@/components/Modal";
import { useReadData } from "@/hooks/useReadData";
import { CollegeType } from "@/types";
import { useState } from "react";
import ApplicationForm from "./Form/ApplicationForm";

export default function ApplyCollegePage() {

  const { data, isLoading, isError } = useReadData<CollegeType[]>('colleges', '/colleges');

  const [open, setOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<CollegeType | null>(null);

  return (
    <div className='bg-primary-10 w-full flex flex-col items-center justify-center py-10'>
      <div className='max-w-7xl w-full'>
        <AppHeader title="Apply to College" description="Apply to leading colleges and universities in India" />
      </div>
      {
        data && data.length == 0 && (
          <h1 className='text-primary-main text-xl font-semibold'>Sorry! No Colleges Found!</h1>
        )
      }
      <div className='max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-3'>
        {
          (isError || isLoading) && (
            Array.from({ length: 5 }, (_, i) => <CollegeCardShortSkeleton key={i} />)
          )
        }
        {
          data && data.map((item, index) => (
            <CollegeCardShort key={index} college={item} onClick={() => {
              setSelectedCollege(item);
              setOpen(true);
            }} />
          ))
        }
      </div>
      <DialogModal open={open} setOpen={setOpen} title="Apply to College" description={selectedCollege?.name ?? ""}>
        <ApplicationForm college={selectedCollege} setOpen={setOpen}/>
      </DialogModal>
    </div>
  )
}
