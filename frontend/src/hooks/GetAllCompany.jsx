import { COMPANY_API } from '@/assets/constant';
import { setCompanies } from '@/Redux/Slices/companySlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const GetAllCompany = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API}/companies`, {
          withCredentials: true,
        });


        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllCompany();
  }, []);
};

export default GetAllCompany;
