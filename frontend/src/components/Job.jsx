import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isReadMore, setIsReadMore] = useState(false);

  const descriptionThreshold = 100;  // Threshold for Read More / Read Less logic

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const daysAgoFunc = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <motion.div
      className="p-5 poppins-medium rounded-xl shadow-lg bg-white border border-gray-200 cursor-pointer transition-all duration-500"
      whileHover={{
        scale: 1.03,
        boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {daysAgoFunc(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunc(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full p-2" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-3">
        <Button variant="outline" className="p-4" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold text-xl">{job?.company?.name}</h1>
          <div className="flex gap-4 items-center">
            <p className="text-sm text-gray-500">India</p>
            <p className="text-sm">{job?.location}</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-semibold text-2xl py-2">{job?.title}</h1>

        {/* Read More / Read Less Logic */}
        <motion.p
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isReadMore
            ? job?.description
            : job?.description.length > descriptionThreshold
            ? `${job?.description.slice(0, descriptionThreshold)}...`
            : job?.description}
        </motion.p>

        {/* Conditionally show Read More / Read Less based on description length */}
        {job?.description.length > descriptionThreshold && (
          <motion.span
            onClick={toggleReadMore}
            className="text-blue-600 cursor-pointer transition-all duration-200 hover:text-blue-700 mt-2"
            whileHover={{ scale: 1.05 }}
          >
            {isReadMore ? ' Read Less' : ' Read More'}
          </motion.span>
        )}
      </div>

      <div className="grid grid-cols-3 place-items-center gap-2 mt-4">
        {job?.requirements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Badge
              variant={'ghost'}
              className={'hover:text-[#7209b7] p-2 text-sm'}
            >
              <p className="inline-block p-1 text-center">{item}</p>
            </Badge>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Badge className={'text-blue-700'} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={'text-[#F83002]'} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={'text-[#7209b7]'} variant="ghost">
          {job?.salary} INR
        </Badge>
      </div>

      <motion.div
        className="flex items-center justify-between mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button
          onClick={() => navigate(`/details/${job?._id}`)}
          variant="outline"
          className="h-10 w-full md:w-auto text-sm"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#5f049b] h-10 w-full md:w-auto mt-2 md:mt-0 text-sm">
          Save For Later
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Job;
