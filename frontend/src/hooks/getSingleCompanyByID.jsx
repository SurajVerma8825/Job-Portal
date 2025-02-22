import { COMPANY_API } from '@/assets/constant';
import { setSingleCompany } from '@/Redux/Slices/companySlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const getSingleCompanyByID = (comapanyID) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API}/company/${comapanyID}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSingleCompany();
  } , [comapanyID, dispatch]);
};

export default getSingleCompanyByID;
