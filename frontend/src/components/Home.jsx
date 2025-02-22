import GetAllJobs from '@/hooks/GetAllJobs';
import { CategoryCrausel, HeroSection, LatestJob } from '@/Index';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  GetAllJobs();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, []);

  return (
    <div>
      <HeroSection />
      <CategoryCrausel />
      <LatestJob />
    </div>
  );
};

export default Home;
