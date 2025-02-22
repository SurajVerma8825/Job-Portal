import { JOB_API } from '@/assets/constant';
import { setAllJobs } from '@/Redux/Slices/jobSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GetAllJobs = () => {
  const dispatch = useDispatch();
  const {searchedQuery } = useSelector((state)=>state.job);

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API}/alljobs?keyword=${searchedQuery}`, {
          withCredentials: true,
        });


        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllJobs();
  }, []);
};

export default GetAllJobs;
