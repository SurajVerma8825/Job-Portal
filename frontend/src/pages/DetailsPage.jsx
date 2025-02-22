import { APPLICATION_APT, JOB_API } from '@/assets/constant';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { setSingleJob } from '@/Redux/Slices/jobSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const DetailsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { singleJob } = useSelector((state) => state.job);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const applyJobHandler = async (e) => {
    try {
      const res = await axios.get(`${APPLICATION_APT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API}/jobs/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="xl:px-16 lg:px-10 md:px-6 px-4 py-2 bg-gradient-to-r from-[#F0F4F8] to-[#ffffff] text-gray-900 poppins-medium transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">{singleJob?.title}</h1>
          <div className="flex items-center gap-4 mt-4">
            <Badge className={'text-blue-700 font-bold'} variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">
              {singleJob?.salary} INR
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          className={`transition-all duration-300 ease-in-out rounded-lg h-10 px-6 ${
            isApplied
              ? 'bg-teal-600 hover:bg-teal-800 cursor-not-allowed shadow-md'
              : 'bg-gradient-to-r from-[#7209b7] to-[#5f32ad] hover:from-[#5f32ad] hover:to-[#7209b7] text-white'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 text-xl mt-6">
        Job Description
      </h1>
      <div className="my-4 flex flex-col gap-4">
        <h1 className="font-bold my-1 capitalize">
          Role:{' '}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{' '}
          <span className="pl-4 font-normal text-gray-800">
            India , {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{' '}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-2 flex">
          Skills:{' '}
          <span className="pl-4 font-normal text-gray-800 flex gap-4 capitalize ">
            {singleJob?.requirements.map((item, index) => {
              return (
                <Badge
                  key={index}
                  variant={'ghost'}
                  className={'hover:text-[#7209b7] cursor-pointer text-gray-700 transition-all duration-300 ease-in-out'}
                >
                  {item}
                </Badge>
              );
            })}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{' '}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} Yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{' '}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} INR
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{' '}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{' '}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt.split('T')[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default DetailsPage;
