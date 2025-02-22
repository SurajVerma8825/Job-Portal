import { JobCard } from '@/Index';
import { useSelector } from 'react-redux';

const LatestJob = () => {
  const { allJobs } = useSelector((state) => state.job);

  return (
    <div className="px-16 py-12 w-full mx-auto poppins-medium">
      <h1 className="text-4xl font-bold ">
        <span className="text-[#6A38C2]">Latest and Top </span>
        Job Openings
      </h1>

      <div className="grid grid-cols-3 gap-4 mt-8 ">
        {allJobs.length <= 0 ? (
          <span>No Job Availible </span>
        ) : (
          allJobs?.slice(0, 6).map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJob;
