import { Button } from "@/components/ui/button";
import { setSearchedQuery } from "@/Redux/Slices/jobSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative text-center px-8 md:px-16 py-16 poppins-medium bg-gradient-to-b from-purple-100 to-white">
      {/* Top Badge */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium shadow-md"
      >
        🚀 No. 1 Hiring Platform
      </motion.span>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl font-extrabold py-4 leading-tight text-gray-900"
      >
        Search, Apply & <br />
        Get Your <span className="text-[#6A38C2]">Dream Job!</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-lg text-gray-600 max-w-xl mx-auto"
      >
        Find your perfect career opportunity among thousands of companies. Your dream job is just a search away!
      </motion.p>

      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex w-full max-w-lg md:max-w-2xl shadow-lg border border-gray-300 bg-white pl-4 rounded-full items-center gap-3 mx-auto mt-6"
      >
        <input
          type="text"
          placeholder="Find your dream job here..."
          className="outline-none border-none w-full font-medium text-gray-700 px-2  text-lg"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          onClick={searchHandler}
          className="rounded-full bg-[#6A38C2] hover:bg-[#441597] transition-all px-5 h-11 flex items-center gap-2"
        >
          <Search className="w-5 h-5 text-white" />
          <span className="hidden md:block text-white font-semibold">Search</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
