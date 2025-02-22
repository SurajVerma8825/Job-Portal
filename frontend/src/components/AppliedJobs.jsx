import { useSelector } from 'react-redux';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const AppliedJobs = () => {
  const { allAppliedJobs } = useSelector((state) => state.job);

  return (
    <div className="p-6 bg-gray-50 min-h-[400px] rounded-lg shadow-md">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">📄 Applied Jobs</h1>

      {allAppliedJobs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">😔 You haven't applied for any job yet.</p>
        </div>
      ) : (
        <Table className="bg-white shadow-lg rounded-lg">
          <TableCaption className="text-gray-600">
            A list of jobs you have applied for.
          </TableCaption>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="text-gray-700 font-semibold">Date</TableHead>
              <TableHead className="text-gray-700 font-semibold">Job Role</TableHead>
              <TableHead className="text-gray-700 font-semibold">Company</TableHead>
              <TableHead className="text-gray-700 font-semibold text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-100 transition-all">
                <TableCell>{appliedJob?.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="font-medium text-gray-900">{appliedJob.job?.title}</TableCell>
                <TableCell className="text-gray-700">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`px-3 py-1 text-sm font-semibold rounded-full
                      ${
                        appliedJob?.status === 'rejected'
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : appliedJob.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                          : 'bg-green-100 text-green-700 border border-green-300'
                      }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AppliedJobs;
