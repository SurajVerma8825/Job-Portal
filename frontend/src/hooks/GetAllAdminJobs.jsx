import { JOB_API } from '@/assets/constant';
import { setAdminAllJobs } from '@/Redux/Slices/jobSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const GetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API}/adminJob `, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAdminAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllAdminJobs();
  }, []);
};

export default GetAllAdminJobs;
