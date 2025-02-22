import { USER_API } from '@/assets/constant';
import { setLoading } from '@/Redux/Slices/authSlice';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import SignUP from '../../assets/SignUp.svg';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    profilePicture: null,
    role: 'student',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRadioChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.post(`${USER_API}/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
 
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <div className="w-full px-16 py-4">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-400 rounded-md p-4"
      >
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <img src={SignUP} alt="Sign up illustration" />
          </div>
          <div className="w-1/2 flex flex-col gap-2 justify-center">
            <h1 className="poppins-medium font-bold text-4xl text-center text-[#6A38C2]">
              Sign Up
            </h1>
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="demo@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                placeholder="+91 123 567 3455"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password here.."
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="picture">Profile</Label>
              <Input
                id="picture"
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
                className="cursor-pointer"
              />
            </div>

            <div className="mx-auto pt-4">
              <RadioGroup
                value={formData.role}
                onValueChange={handleRadioChange}
                className="flex items-center gap-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="student"
                    id="r1"
                    checked={formData.role === 'student'}
                    className="text-[#6A38C2] border-[#6A38C2]"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="recruiter"
                    id="r2"
                    checked={formData.role === 'recruiter'}
                    className="text-[#6A38C2] border-[#6A38C2]"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            {loading ? (
              <Button className="bg-green-400 hover:bg-green-600">
                <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="mt-4 bg-[#6A38C2] hover:bg-[#4712a1]"
              >
                Sign up
              </Button>
            )}

            <div className="flex justify-center items-center font-medium">
              <p>Already have an account?</p>
              <Link to="/login" className="text-[#6A38C2] ml-2">
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
