import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GetAllAdminJobs from '@/hooks/GetAllAdminJobs';
import { AdminJobsTable } from '@/Index';
import { setSearchJobByText } from '@/Redux/Slices/jobSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobs = () => {
  GetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div>
      {' '}
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate('/admin/jobs/create ')}
            className="bg-green-500 hover:bg-green-600 "
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
