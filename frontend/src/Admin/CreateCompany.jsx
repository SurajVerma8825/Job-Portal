import { COMPANY_API } from '@/assets/constant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setSingleCompany } from '@/Redux/Slices/companySlice';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const createComapany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyID = res?.data?.company?._id;
        navigate(`/admin/companies/${companyID}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto poppins-medium">
      <div className="my-10">
        <h1 className="font-bold text-2xl">Your Company Name</h1>
        <p className="text-gray-500">
          What would you like to give your company name? you can change this
          later.
        </p>
      </div>

      <Label>Company Name</Label>
      <Input
        type="text"
        className="my-2 focus-visible:ring-transparent"
        placeholder="JobHunt, Microsoft etc."
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <div className="flex items-center gap-2 my-10">
        <Button variant="outline" onClick={() => navigate('/admin/companies')}>
          Cancel
        </Button>
        <Button
          onClick={createComapany}
          className="bg-[#7209b7] hover:bg-[#5f049b]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CreateCompany;
