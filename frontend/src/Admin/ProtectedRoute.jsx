import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === 'null' || user.role !== 'recruiter') {
      navigate('/');
    }
  }, [user, navigate]);

  // Only render children if the user is a recruiter
  return user && user.role === 'recruiter' ? children : null;
};

export default ProtectedRoute;
