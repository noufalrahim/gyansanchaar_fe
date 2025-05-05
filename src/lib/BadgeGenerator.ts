import { StatusType } from "@/types";
import { CheckCircle, Clock, HelpCircle, LucideIcon, Send, XCircle } from "lucide-react";

export const statusMap: Record<
    | typeof StatusType.Application[keyof typeof StatusType.Application]
    | typeof StatusType.Documents[keyof typeof StatusType.Documents]
    | typeof StatusType.Payment[keyof typeof StatusType.Payment]
    | typeof StatusType.Admission[keyof typeof StatusType.Admission]
    | typeof StatusType.Other[keyof typeof StatusType.Other],
    { label: string; color: string, icon: LucideIcon }
> = {
    [StatusType.Application.ApplicationFormPending]: {
        label: "Pending Submission",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock
    },
    [StatusType.Application.ApplicationFormRejected]: {
        label: "Rejected",
        color: "bg-red-100 text-red-800",
        icon: XCircle
    },
    [StatusType.Application.ApplicationFormSubmitted]: {
        label: "Submitted",
        color: "bg-blue-100 text-blue-800",
        icon: Send
    },
    [StatusType.Application.ApplicationFormVerificationPending]: {
        label: "Verification Pending",
        color: "bg-orange-100 text-orange-800",
        icon: Clock
    },
    [StatusType.Application.ApplicationFormVerified]: {
        label: "Verified",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle
    },

    [StatusType.Payment.PaymentPending]: {
        label: "Payment Pending",
        color: "bg-orange-100 text-orange-800",
        icon: Clock
    },
    [StatusType.Payment.PaymentCompleted]: {
        label: "Payment Completed",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle
    },

    [StatusType.Documents.DocumentUploadPending]: {
        label: "Upload Pending",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock
    },
    [StatusType.Documents.DocumentUploaded]: {
        label: "Document Uploaded",
        color: "bg-blue-100 text-blue-800",
        icon: Send
    },
    [StatusType.Documents.DocumentVerificationPending]: {
        label: "Verification Pending",
        color: "bg-orange-100 text-orange-800",
        icon: Clock
    },
    [StatusType.Documents.DocumentVerificationRejected]: {
        label: "Verification Rejected",
        color: "bg-red-100 text-red-800",
        icon: XCircle
    },
    [StatusType.Documents.DocumentVerified]: {
        label: "Verified",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle
    },

    [StatusType.Admission.AdmissionLetterOffered]: {
        label: "Offered",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle
    },
    [StatusType.Admission.AdmissionLetterPending]: {
        label: "Pending Offer",
        color: "bg-blue-100 text-blue-800",
        icon: Clock
    },

    [StatusType.Other.Unknown]: {
        label: "Unknown",
        color: "bg-gray-100 text-gray-800",
        icon: HelpCircle
    },
};
