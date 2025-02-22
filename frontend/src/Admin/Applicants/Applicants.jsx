import { APPLICATION_APT } from '@/assets/constant';
import { ApplicansTable } from '@/Index';
import { setAllApplicants } from '@/Redux/Slices/applicationSice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.application);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_APT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, []);

  return (
    <div className="max-w-7xl mx-auto poppins-medium">
      <h1 className="font-bold text-xl my-5">
        Applicants Applicants {applicants?.applications?.length}
      </h1>
      <ApplicansTable />
    </div>
  );
};

export default Applicants;
