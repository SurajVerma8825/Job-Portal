import { setAllJobs } from '@/Redux/Slices/jobSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  console.log("user" , user);


  useEffect(() => {
    const fetchAllJobs = async () => {
     

      try {
        const res = await axios.get(
          `https://job-portal-kpvv.onrender.com/job/alljobs?keyword=${searchedQuery || ''}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchAllJobs();
  }, [user]); // ✅ user state ke change hone par re-fetch hoga
};

export default GetAllJobs;
