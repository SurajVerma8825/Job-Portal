import GetAllJobs from '@/hooks/GetAllJobs';
import { Job } from '@/Index';
import { setSearchedQuery } from '@/Redux/Slices/jobSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Browse = () => {
  GetAllJobs()
  const dispatch = useDispatch();

  const { allJobs } = useSelector((state) => state.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, []);

  return (
    <div className="xl:px-16 lg:px-10 md:px-6 px-4   py-2 poppins-medium">
      <h1 className=" font-bold text-xl my-6">
        Search Results{' '}
        <span className="text-[#7209b7]">({allJobs.length})</span>
      </h1>

      <div className="grid grid-cols-3 gap-4 ">
        {allJobs.map((job) => {
          return <Job key={job._id} job={job} />;
        })}
      </div>
    </div>
  );
};

export default Browse;
