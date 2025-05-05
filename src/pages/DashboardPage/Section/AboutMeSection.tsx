import { AboutMeCard } from '@/components/Cards'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store';
export default function AboutMeSection() {

  const user = useSelector((state: RootState) => state.user);

  const personalInformation = [
    {label: "Name", value: user.user!.name || "N/A"},
    {label: "Email", value: user.user!.email || "N/A"},
    {label: "Phone", value: user.user!.mobile || "N/A"},
    {label: "Date of Birth", value: user.user!.dateOfBirth || "N/A"},
    {label: "Gender", value: user.user!.gender || "N/A"},
    {label: "Physical Disability", value: user.user!.physicalDisability ? "Yes" : "No"},
    {label: "City", value: user.user!.city || "N/A"},
    {label: "State", value: user.user!.state || "N/A"},
    {label: "Pincode", value: user.user!.pincode || "N/A"},
  ];

  const academicInformation = [
    {label: "Class 10 Board", value: user.user!.class10Board?.toString() || "N/A"},
    {label: "Class 10 School", value: user.user!.class10School?.toString() || "N/A"},
    {label: "Class 10 Passing Year", value: user.user!.class10PassingYear?.toString() || "N/A"},
    {label: "Class 10 Marks Type", value: user.user!.class10MarksType?.toString() || "N/A"},
    {label: "Class 10 Percentage or CGPA", value: user.user!.class10PercentageOrCGPA?.toString() || "N/A"},
    {label: "Class 10 Marks", value: user.user!.class10Marks?.toString() || "N/A"},
    {label: "Class 12 Board", value: user.user!.class12Board?.toString() || "N/A"},
    {label: "Class 12 School", value: user.user!.class12School?.toString() || "N/A"},
    {label: "Class 12 Passing Year", value: user.user!.class12PassingYear?.toString()|| "N/A"},
    {label: "Class 12 Stream", value: user.user!.class12Stream?.toString() || "N/A"},
    {label: "Class 12 Marks Type", value: user.user!.class12MarksType?.toString() || "N/A"},
    {label: "Class 12 Percentage or CGPA", value: user.user!.class12PercentageOrCGPA?.toString() || "N/A"},
    {label: "Class 12 Marks", value: user.user!.class12Marks?.toString() || "N/A"}, 
  ];


  return (
    <div className='flex flex-col gap-4'>
        <AboutMeCard title="Personal Information" items={personalInformation} />
        <AboutMeCard title="Academic Information" items={academicInformation} />
    </div>
  )
}
