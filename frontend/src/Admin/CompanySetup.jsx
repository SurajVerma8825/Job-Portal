import { COMPANY_API } from '@/assets/constant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import getSingleCompanyByID from '@/hooks/getSingleCompanyByID';
import axios from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CompanySetup = () => {
  const params = useParams();
  getSingleCompanyByID(params.id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { singleCompany } = useSelector((state) => state.company);

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      const res = await axios.put(
        `${COMPANY_API}/update/${params.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      description: singleCompany.description || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-8 py-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-5 mb-8">
        <Button
          onClick={() => navigate('/admin/jobs')}
          variant="outline"
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-semibold rounded-lg py-2 px-4 transition ease-in-out duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </Button>
        <h1 className="text-4xl font-extrabold text-gray-800">Company Setup</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <Label className="text-gray-700 text-sm font-medium">
              Company Name
            </Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter Company Name"
              className=" focus-visible:ring-transparent mt-2 px-4 rounded-lg  "
            />
          </div>
          <div>
            <Label className="text-gray-700 text-sm font-medium">
              Description
            </Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter Company Description"
              className=" focus-visible:ring-transparent mt-2 px-4 rounded-lg  "
            />
          </div>
          <div>
            <Label className="text-gray-700 text-sm font-medium">Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              placeholder="Enter Website URL"
              className=" focus-visible:ring-transparent mt-2 px-4 rounded-lg  "
            />
          </div>
          <div>
            <Label className="text-gray-700 text-sm font-medium">
              Location
            </Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Enter Location"
              className=" focus-visible:ring-transparent mt-2 px-4 rounded-lg  "
            />
          </div>
          <div>
            <Label className="text-gray-700 text-sm font-medium">Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className=" focus-visible:ring-transparent mt-2 px-4 rounded-lg  "
            />
          </div>
        </div>
        {loading ? (
          <Button className="w-full mt-6 py-3 bg-green-600  text-white rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full mt-6 py-3 bg-[#7209b7] hover:bg-[#5f049b] text-white rounded-xl "
          >
            Update
          </Button>
        )}
      </form>
    </div>
  );
};

export default CompanySetup;
