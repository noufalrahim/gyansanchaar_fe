import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Download, FileText, Trash2 } from 'lucide-react';

export default function DashboardDocumentsCard() {
  return (
    <Table className="min-w-full divide-y divide-gray-200 text-sm">
      <TableHead className="bg-gray-50">
        <TableRow>
          <TableCell className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">Name</TableCell>
          <TableCell className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">Type</TableCell>
          <TableCell className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">Uploaded On</TableCell>
          <TableCell className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider">Size</TableCell>
          <TableCell className="px-4 py-3 font-medium text-gray-500 uppercase tracking-wider text-right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className="bg-white divide-y divide-gray-100">
        {[
          {
            name: 'HighSchool_Transcript.pdf',
            type: 'Transcript',
            date: 'Jan 10, 2024',
            size: '1.2 MB',
          },
          {
            name: 'Recommendation_Letter.pdf',
            type: 'Letter',
            date: 'Jan 12, 2024',
            size: '845 KB',
          },
          {
            name: 'Personal_Statement.docx',
            type: 'Statement',
            date: 'Jan 14, 2024',
            size: '632 KB',
          },
          {
            name: 'SAT_Score_Report.pdf',
            type: 'Test Score',
            date: 'Jan 15, 2024',
            size: '1.4 MB',
          },
        ].map((doc, index) => (
          <TableRow key={index}>
            <TableCell className="px-4 py-3 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{doc.name}</span>
              </div>
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-600 whitespace-nowrap">{doc.type}</TableCell>
            <TableCell className="px-4 py-3 text-gray-600 whitespace-nowrap">{doc.date}</TableCell>
            <TableCell className="px-4 py-3 text-gray-600 whitespace-nowrap">{doc.size}</TableCell>
            <TableCell className="px-4 py-3 text-right whitespace-nowrap">
              <button className="text-blue-600 hover:text-blue-800 mr-3">
                <Download className="w-4 h-4" />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash2 className="w-4 h-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
