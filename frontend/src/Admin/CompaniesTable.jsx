import { DELETE_COMPANY_API } from '@/assets/constant';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (state) => state.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  const deleteHandler = async (companyID) => {
    try {
      const res = await axios.delete(`${DELETE_COMPANY_API}/${companyID}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success(res.data.message);

        // Update the local state to remove the deleted company
        setFilterCompany((prevCompanies) =>
          prevCompanies.filter((company) => company._id !== companyID)
        );
      }
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  };

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="poppins-medium p-6 bg-gradient-to-r from-gray-50 via-white to-gray-100 shadow-lg rounded-xl">
      <Table>
        <TableCaption className="text-xl text-center text-gray-700 font-semibold mb-6">
          A List of Recently Registered Companies
        </TableCaption>
        <TableHeader>
          <TableRow className="text-gray-600 text-sm font-semibold">
            <TableHead className="px-4 py-3">Logo</TableHead>
            <TableHead className="text-center px-4 py-3">Name</TableHead>
            <TableHead className="text-center px-4 py-3">Date</TableHead>
            <TableHead className="text-right px-4 py-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="transition-all duration-200 ease-in-out hover:bg-indigo-50 hover:shadow-xl"
            >
              <TableCell className="px-4 py-3">
                <Avatar>
                  <AvatarImage
                    src={company.logo}
                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                  />
                </Avatar>
              </TableCell>
              <TableCell className="text-center px-4 py-3 text-gray-700">{company.name}</TableCell>
              <TableCell className="text-center px-4 py-3 text-gray-500">
                {company.createdAt.split('T')[0]}
              </TableCell>
              <TableCell className="text-right px-4 py-3">
                <div className="flex gap-4 justify-end">
                  <Button
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                    variant="secondary"
                    className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteHandler(company._id)}
                    variant="secondary"
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
