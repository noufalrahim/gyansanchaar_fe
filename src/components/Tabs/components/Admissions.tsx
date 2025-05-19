import { useReadData } from "@/hooks/useReadData";
import admissionDataFormatter from "@/lib/DataFormatter/admissionDataFormatter";
import { AdmissionCriteriaType, AdmissionType } from "@/types";

interface AdmissionsProps {
  collegeId: string;
};

export default function Admissions({ collegeId }: AdmissionsProps) {

  const { data: admissonsData,
    // isLoading: factsDataIsLoading 
  } = useReadData<{
    admission: AdmissionType,
    admissionCriteria: AdmissionCriteriaType,
  }[]>('admissions', `/admissions/field/collegeId/${collegeId}`);


  if(!admissonsData){
    return <h1>Loading...</h1>
  }
  const formattedData = admissionDataFormatter(admissonsData);
  
  return (
    <div className='w-full bg-white border border-light-100 rounded-lg p-5'>
      {formattedData && formattedData.map((admission, index) => (
        <div key={index} className='mb-5'>
          <p className='text-primary-main text-xl font-semibold mb-2'>{admission.admission.title}</p>

          {/* <ul className='list-disc list-inside text-gray-700'>
            {formattedData &&  admission.admissionCriteria.map((criteria: AdmissionCriteriaType, i: number) => (
              <li key={i} className='mb-1'>{criteria.criteria}</li>
            ))}
          </ul> */}
        </div>
      ))}
    </div>
  );
}
