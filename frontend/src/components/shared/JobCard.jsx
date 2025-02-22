import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${job._id}`)}
      className="p-6 rounded-xl border bg-white shadow-md transition-all duration-300 cursor-pointer
                 hover:shadow-xl hover:scale-105 border-gray-200 min-h-[320px] flex flex-col justify-between"
    >
      {/* Company Name */}
      <h1 className="text-lg font-semibold text-gray-800">{job?.company?.name}</h1>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <p>📍 India</p>
        <p>| {job?.location}</p>
      </div>

      {/* Job Title & Description */}
      <div className="mt-2">
        <h1 className="text-xl font-bold text-gray-900">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Skills Required */}
      <div className="flex flex-wrap gap-2 mt-3">
        {job?.requirements.map((item, index) => (
          <Badge key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
            {item}
          </Badge>
        ))}
      </div>

      {/* Job Details */}
      <div className="flex items-center flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
          {job?.position } Positions
        </Badge>
        <Badge className="text-red-700 bg-red-100 px-3 py-1 rounded-full">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
          {job?.salary} INR
        </Badge>
      </div>
    </div>
  );
};

export default JobCard;
