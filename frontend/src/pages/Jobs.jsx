import GetAllJobs from '@/hooks/GetAllJobs';
import { FilterCard, Job } from '@/Index';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Jobs = () => {
  GetAllJobs();
  const { allJobs, searchedQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (allJobs && allJobs?.length > 0) {
      if (searchedQuery) {
        const filteredJobs = allJobs.filter((job) => {
          return (
            job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.description
              .toLowerCase()
              .includes(searchedQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchedQuery.toLowerCase())
          );
        });
        setFilterJobs(filteredJobs);
      } else {
        setFilterJobs(allJobs);
      }
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="w-full  flex xl:px-6 lg:px-10 md:px-6 px-4 xl:py-8 lg:py-4 py-2 gap-4">
      {/* Filter Section */}
      <div className="w-[25%] xl:w-[20%] bg-white  rounded-xl  shadow-lg">
        <FilterCard />
      </div>

      {/* Jobs Grid Section */}
      {filterJobs.length === 0 ? (
        <div className="loader mx-auto mt-32 text-xl text-gray-500">JOB NOT FOUND</div>
      ) : (
        <div className="flex-1  pb-5">
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
            {filterJobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
                key={job._id}
                className="flex justify-center"
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
