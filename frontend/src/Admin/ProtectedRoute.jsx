import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'recruiter') {
      navigate('/');
    }
  }, [user, navigate]);

  if (user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Loading...
      </div>
    );
  }

  return user?.role === 'recruiter' ? children : null;
};

export default ProtectedRoute;
