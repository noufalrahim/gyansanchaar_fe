import { StatusType, StatusTypeValues } from "@/types";

export const nextStatusGenerator = (status: StatusTypeValues) => {
    switch (status) {
        case StatusType.Application.ApplicationFormSubmitted:
            return StatusType.Application.ApplicationFormVerificationPending;
        case StatusType.Application.ApplicationFormVerified:
            return StatusType.Payment.PaymentPending;
        case StatusType.Payment.PaymentCompleted:
            return StatusType.Documents.DocumentUploadPending;
        case StatusType.Documents.DocumentUploaded:
            return StatusType.Documents.DocumentVerificationPending;
        case StatusType.Documents.DocumentVerified:
            return StatusType.Admission.AdmissionLetterPending;
        default:
            return StatusType.Application.ApplicationFormPending;
    }
}
