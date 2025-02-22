import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GetAllCompany from '@/hooks/GetAllCompany';
import { CompaniesTable } from '@/Index';
import { setSearchCompanyByText } from '@/Redux/Slices/companySlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Companies = () => {
  GetAllCompany();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="bg-gradient-to-r from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto my-12 p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between my-6">
          <div className="w-3/5">
            <Input
              className="w-full py-3 focus-visible:ring-transparent px-4 rounded-md focus:outline-none transition-all"
              placeholder="Filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button
            onClick={() => navigate('/admin/companies/create')}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
          >
            New Company
          </Button>
        </div>

        {/* Companies Table */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
