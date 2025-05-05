import { TableComponent } from '@/components/Table'

interface CoursesProps {
  collegeId: string;
};

export default function Courses({collegeId}: CoursesProps) {
  return (
    <div>
      <TableComponent collegeId={collegeId}/>
    </div>
  )
}
