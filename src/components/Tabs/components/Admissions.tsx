export default function Admissions() {
  const admissions = [
    {
      title: "East Point Group Of Institutions M.Com Admissions",
      criteria: [
        "Candidate should have completed graduation.",
        "Minimum CGPA of 7.7.",
        "Entrance exam qualification required.",
        "Personal interview with faculty panel."
      ]
    },
    {
      title: "East Point Group Of Institutions M.Tech Admissions",
      criteria: [
        "Candidate should have completed graduation in a relevant field.",
        "Minimum CGPA of 7.7.",
        "GATE qualification preferred.",
        "Work experience in the technical domain is a plus."
      ]
    },
    {
      title: "East Point Group Of Institutions MBA Admissions",
      criteria: [
        "Candidate should have completed graduation in any discipline.",
        "Minimum CGPA of 7.0.",
        "CAT/MAT/XAT scores required.",
        "Group discussion and personal interview rounds."
      ]
    }
  ];

  return (
    <div className='w-full bg-white border border-light-100 rounded-lg p-5'>
      {admissions.map((admission, index) => (
        <div key={index} className='mb-5'>
          <p className='text-primary-main text-xl font-semibold mb-2'>{admission.title}</p>
          <ul className='list-disc list-inside text-gray-700'>
            {admission.criteria.map((criterion, i) => (
              <li key={i} className='mb-1'>{criterion}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
