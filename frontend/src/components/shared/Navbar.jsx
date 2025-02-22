import { USER_API } from '@/assets/constant';
import { setUser } from '@/Redux/Slices/authSlice';
import { PopoverTrigger } from '@radix-ui/react-popover';
import axios from 'axios';
import { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Popover, PopoverContent } from '../ui/popover';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="hidden lg:block bg-white px-16 py-4">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/">
            <h1 className=" text-3xl font-bold  ">
              Hire<span className=" text-[#F83002]">Hub</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <ul className=" flex font-medium items-center gap-5">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies">Compnaies </Link>
                </li>
                <li>
                  <Link to="/admin/jobs"> Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <Link to="/">
                  <li>Home </li>
                </Link>
                <Link to="/jobs">
                  <li> Job </li>
                </Link>
                <Link to="/browse">
                  <li> Browse </li>
                </Link>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className=" bg-[#6A38C2] hover:bg-[#5b30a6] ">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div>
                  <div className="flex flex-col gap- items-center">
                    <div className="flex justify-center items-center">
                      <Avatar className=" cursor-pointer">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="@shadcn"
                        />
                      </Avatar>
                    </div>
                    <div className="">
                      <h4 className="font-medium text-lg text-center">
                        {user?.fullName}
                      </h4>
                      <p className=" text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between px-2">
                    {user && user.role === 'student' && (
                      <div className="flex items-center mt-2">
                        <FiUser className="text-xl" />
                        <Button
                          variant="link"
                          className="h-6 w-14 font-medium text-md"
                        >
                          <Link onClick={() => setOpen(false)} to="/profile">
                            Profile
                          </Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center mt-2">
                      <AiOutlineLogout className="text-xl" />
                      <Button
                        onClick={() => {
                          logOutHandler();
                          setOpen(false); // Close the popover when logging out
                        }}
                        variant="link"
                        className="h-6 w-14 font-medium text-md cursor-pointer "
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
