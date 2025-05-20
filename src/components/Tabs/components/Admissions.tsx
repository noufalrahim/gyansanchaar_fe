// import { useReadData } from "@/hooks/useReadData";
// import admissionDataFormatter from "@/lib/DataFormatter/admissionDataFormatter";
// import { AdmissionCriteriaType, AdmissionType } from "@/types";

import { AdmissionCriteriaType, AdmissionType } from "@/types";

interface AdmissionsProps {
  collegeId: string;
};

export default function Admissions({ collegeId }: AdmissionsProps) {

  console.log(collegeId);

  // const { data: admissonsData,
  //   // isLoading: factsDataIsLoading 
  // } = useReadData<{
  //   admission: AdmissionType,
  //   admissionCriteria: AdmissionCriteriaType,
  // }[]>('admissions', `/admissions/field/collegeId/${collegeId}`);


  // if(!admissonsData){
  //   return <h1>Loading...</h1>
  // }
  // const formattedData = admissionDataFormatter(admissonsData);

  const data: AdmissionType[] = [
    {
      title: 'University Institute of Engieering and Technology',
      criteria: [
        {
          criteria: 'Maths,Physics,Chemistry',
        },
        {
          criteria: 'Intermediate or 10+2 with 50% Marks',
        }
      ]
    },
    {
      title: 'University Institute of Management and Commerce',
      criteria: [
        {
          criteria: 'Maths,Physics,Chemistry',
        },
        {
          criteria: 'Intermediate or 10+2 with 50% Marks',
        }
      ]
    },
    {
      title: 'University Institute of Computer Science and Applications',
      criteria: [
        {
          criteria: 'Maths,Physics,Chemistry',
        },
        {
          criteria: 'Intermediate or 10+2 with 50% Marks',
        }
      ]
    },
    {
      title: 'University Institute of Agriculture and Horticulture',
      criteria: [
        {
          criteria: 'Maths,Physics,Chemistry',
        },
        {
          criteria: 'Intermediate or 10+2 with 50% Marks',
        }
      ]
    },
    {
      title: 'University Institute of Pharmaceutical Sciences',
      criteria: [
        {
          criteria: 'Maths,Physics,Chemistry',
        },
        {
          criteria: 'Intermediate or 10+2 with 50% Marks',
        }
      ]
    },
    {
      title: 'University Institute of Allied and Health Sciences',
      criteria: [
        {
          criteria: 'Maths,Physics,Chemistry',
        },
        {
          criteria: 'Intermediate or 10+2 with 50% Marks',
        }
      ]
    }
  ]
  
  return (
    <div className='w-full bg-white border border-light-100 rounded-lg p-5'>
      {data && data.map((admission, index) => (
        <div key={index} className='mb-5'>
          <p className='text-primary-main text-xl font-semibold mb-2'>{admission.title}</p>

          <ul className='list-disc list-inside text-gray-700'>
            {admission &&  admission.criteria!.map((criteria: AdmissionCriteriaType, i: number) => (
              <li key={i} className='mb-1'>{criteria.criteria}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
