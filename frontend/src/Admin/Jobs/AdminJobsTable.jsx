import { JOB_API } from '@/assets/constant';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminJobsTable = () => {
  const { adminAllJobs, searchJobByText } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(adminAllJobs);
  const navigate = useNavigate();

  const deleteJobs = async (jobID) => {
    try {
      const res = await axios.delete(`${JOB_API}/deleteJob/${jobID}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success(res.data.message);

        setFilterJobs((prevJobs) => {
          const updatedJobs = prevJobs.filter((job) => job._id !== jobID);
          console.log('Updated job list:', updatedJobs);
          return updatedJobs;
        });
      } else {
        toast.error('Failed to delete job.');
      }
    } catch (error) {
      console.error('Error deleting job:', error.response.data);
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  };

  useEffect(() => {
    const filteredJob =
      adminAllJobs.length >= 0 &&
      adminAllJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJob);
  }, [adminAllJobs, searchJobByText]);

  return (
    <div className="poppins-medium ">
      <Table>
        <TableCaption>A list of your recent posted jobs </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-center ">Company Name</TableHead>
            <TableHead className=" text-center ">Role</TableHead>
            <TableHead className=" text-center">Date</TableHead>
            <TableHead className=" text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id}>
              <TableCell className=" text-center ">
                {job.company?.name}
              </TableCell>
              <TableCell className=" text-center ">{job.title}</TableCell>
              <TableCell className=" text-center">
                {job.createdAt?.split('T')[0]}
              </TableCell>
              <TableCell className=" text-right">
                <div className="flex items-center justify-evenly gap-2 ">
                  <div>
                    <Button
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className=" bg-blue-600 h-8 hover:bg-blue-700 text-white"
                    >
                      User
                    </Button>
                  </div>

                  <div>
                    <Button
                      onClick={() =>
                        navigate(`/admin/companies/${job.company._id}`)
                      }
                      className=" bg-yellow-400 h-8 hover:bg-yellow-500 text-black"
                    >
                      Edit
                    </Button>
                  </div>

                  <div>
                    <Button
                      onClick={() => deleteJobs(job._id)}
                      className=" bg-red-600 h-8 hover:bg-red-700 text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
