import { JOB_API } from '@/assets/constant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    position: 0,
    companyId: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((state) => state.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    } else {
      console.error('Selected company not found');
    }
  };

  const jobTypeChangeHandler = (value) => {
    setInput({ ...input, jobType: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API}/addJob`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-4xl font-extrabold text-gray-800">Post New Job</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <Label className="text-gray-700 text-sm font-medium">
              Job Title
            </Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              placeholder="Enter the job title"
              className="focus-visible:ring-transparent mt-2 px-4 rounded-lg"
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
              placeholder="Enter job description"
              className="focus-visible:ring-transparent mt-2 px-4 rounded-lg"
            />
          </div>

          <div>
            <Label className="text-gray-700 text-sm font-medium">
              Requirements
            </Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              placeholder="Enter job requirements"
              className="focus-visible:ring-transparent mt-2 px-4 rounded-lg"
            />
          </div>

          <div>
            <Label className="text-gray-700 text-sm font-medium">Salary</Label>
            <Input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              placeholder="Enter job salary"
              className="focus-visible:ring-transparent mt-2 px-4 rounded-lg"
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
              placeholder="Enter job location"
              className="focus-visible:ring-transparent mt-2 px-4 rounded-lg"
            />
          </div>

          <div>
            <Label className="text-gray-700 text-sm font-medium">
              Job Type
            </Label>
            <Select onValueChange={jobTypeChangeHandler}>
              <SelectTrigger className="w-full my-2">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Job Type</SelectLabel>
                  <SelectItem value="Full Time">Full Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-700 text-sm font-medium">
              Experience Level
            </Label>
            <Input
              type="text"
              name="experienceLevel"
              value={input.experienceLevel}
              onChange={changeEventHandler}
              placeholder="Enter job experience level"
              className="focus-visible:ring-transparent mt-2 px-4 rounded-lg"
            />
          </div>

          <div>
            <Label className="text-gray-700 text-sm font-medium">
              No of Positions
            </Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              placeholder="Enter number of job position"
              className="focus-visible:ring-transparent mt-2 px-4 rounded-lg"
            />
          </div>
        </div>

        {companies.length > 0 && (
          <Select onValueChange={selectChangeHandler} className="pt-6">
            <SelectTrigger className="my-4 mt-4 focus:outline-none focus:ring-transparent">
              <SelectValue placeholder="Select a Company  " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Company</SelectLabel>
                {companies.map((company, index) => (
                  <SelectItem key={index} value={company.name.toLowerCase()}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {loading ? (
          <Button className="w-full mt-6 py-3 bg-green-600 text-white rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full mt-6 py-3 bg-[#7209b7] hover:bg-[#5f049b] text-white rounded-xl"
          >
            Post New Job
          </Button>
        )}

        {companies.length === 0 && (
          <p className="text-xs text-red-600 font-bold text-center my-3">
            *Please register a company first, before posting a job
          </p>
        )}
      </form>
    </div>
  );
};

export default PostJob;
