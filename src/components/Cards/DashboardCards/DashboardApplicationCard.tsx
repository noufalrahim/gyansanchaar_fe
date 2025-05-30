import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'
import { ApplicationType, ApplicationTypeWithId, StatusType, StatusTypeValues } from '@/types'
import { formatDate } from 'date-fns'
import { nextStatusGenerator } from '@/lib/NextStatusGenerator';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import { DialogModal } from '@/components/Modal';
import { useState } from 'react';
import { useModifyData } from '@/hooks/useModifyData';
import { useToast } from "@/hooks/use-toast";
import { DocumentUploadForm } from '@/pages/DashboardPage';
import { statusMap } from '@/lib/BadgeGenerator';

interface DashboardApplicationCardProps {
  application: ApplicationType;
  refetch: () => void;
}

export default function DashboardApplicationCard({ application, refetch }: DashboardApplicationCardProps) {

  const [open, setOpen] = useState<boolean>(false);
  const [openDocumentUploadModal, setOpenDocumentUploadModal] = useState<boolean>(false);

  const Icon = statusMap[application.status as keyof typeof statusMap].icon;

  const { toast } = useToast();

  const { mutate: updateApplicationStatus, isPending } = useModifyData<ApplicationTypeWithId>(`/applications`);

  const handlePayment = () => {
    setOpen(false);
    updateApplicationStatus({
      id: application.id!,
      userId: application.userId,
      collegeId: application.collegeId,
      courseId: application.courseId,
      status: StatusType.Payment.PaymentCompleted,
    },
      {
        onSuccess: () => {
          toast({
            title: "Completed Payment",
            description: "Payment has been completed successfully!",
          });
          setOpen(false);
          refetch();
        },
        onError: () => {
          toast({
            title: "Error",
            description: "An error occured!",
            variant: "destructive",
          })
        }
      }
    );
  }
  return (
    <div
      key={application.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-up"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-1">{application.college?.name}</h2>
            <div className="text-gray-600">{application.course?.courseFrame.name}</div>
          </div>
          <div className="mt-2 sm:mt-0">
            <div className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
              statusMap[application.status as keyof typeof statusMap].color
            )}>
              {statusMap[application.status as keyof typeof statusMap].label}
              <Icon className='w-4 h-4 ml-1'/>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1.5" />
            <span>Applied: {formatDate(application.createdAt!, 'dd MMM yyyy')}</span>
          </div>
        </div>
      </div>

      <div className="p-6">

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="font-medium text-blue-800 mb-1">Next Step</div>
          <div className="text-blue-700 text-sm">{statusMap[nextStatusGenerator(application.status as StatusTypeValues)].label}</div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          {
            (nextStatusGenerator(application.status as StatusTypeValues) === StatusType.Payment.PaymentPending) &&
            (
              <div className="mb-3 sm:mb-0">
                <div className="text-sm text-gray-600 mb-1">Application Fee:</div>
                <div className={cn(
                  "flex items-center",
                  application.status === StatusType.Payment.PaymentCompleted ? 'text-green-700' : 'text-amber-700'
                )}>
                  <span className="font-medium">$100</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium bg-opacity-20 border border-current">
                    {application.status === StatusType.Payment.PaymentCompleted ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            )
          }

          <div className="flex gap-3 self-end">
            <SecondaryButton label="View Details" className='text-sm' />

            {nextStatusGenerator(application.status as StatusTypeValues) === StatusType.Payment.PaymentPending && (
              <PrimaryButton label="Complete Payment" className='text-sm' onClick={() => setOpen(true)} />
            )}

            {nextStatusGenerator(application.status as StatusTypeValues) === StatusType.Documents.DocumentUploadPending && (
              <PrimaryButton label="Upload Documents" className='text-sm' onClick={() => setOpenDocumentUploadModal(true)} />
            )}
            
          </div>
        </div>
      </div>
      <DialogModal open={open} setOpen={setOpen} title="Payment" description="Payment">
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <h1>Proceed to Payment</h1>
            <p>Please make the payment to complete the application process.</p>
          </div>
          <div className='flex gap-2 w-full'>
            <SecondaryButton label='Failed to Pay' className='text-sm w-full bg-red-500 hover:bg-red-600 text-white' onClick={() => setOpen(false)} />
            <PrimaryButton label="Success Payment" className='text-sm w-full' onClick={handlePayment} loading={isPending} />
          </div>
        </div>
      </DialogModal>
      <DialogModal open={openDocumentUploadModal} setOpen={setOpenDocumentUploadModal} title="Upload Documents" description="Upload documents to verify">
        <DocumentUploadForm setOpen={setOpenDocumentUploadModal} application={application}/>
      </DialogModal>
    </div>
  )
}
