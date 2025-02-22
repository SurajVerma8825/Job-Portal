import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/Redux/Slices/jobSlice";
import { motion } from "framer-motion";

const FilterCard = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Mumbai"],
    },
    {
      filterType: "Position",
      array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
    {
      filterType: "Salary",
      array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
    },
  ];

  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  // Reset filter to show all jobs
  const resetFilter = () => {
    setSelectedValue("");
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white px-4  rounded-xl  poppins-medium"
    >
      <h1 className="font-bold text-2xl text-gray-800">🎯 Filter Jobs</h1>
      <hr className="mt-3 mb-4 border-gray-300" />

      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {/* All Button */}
        <div className="flex justify-center mb-2">
          <Button
            onClick={resetFilter}
            className={`rounded-full h-6 hover:bg-purple-800 ${
              selectedValue === ""
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All
          </Button>
        </div>

        {filterData.map((data, index) => (
          <div key={index} className="mb-5">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="font-semibold text-lg text-purple-700"
            >
              {data.filterType}
            </motion.h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <motion.div
                  key={itemId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="flex items-center space-x-3 my-2"
                >
                  <RadioGroupItem
                    className="text-purple-600 border-purple-600 focus:ring-purple-400"
                    value={item}
                    id={itemId}
                  />
                  <Label
                    className={`text-lg transition-all duration-300 ${
                      selectedValue === item
                        ? "text-purple-800 font-bold"
                        : "text-gray-700"
                    }`}
                    htmlFor={itemId}
                  >
                    {item}
                  </Label>
                </motion.div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default FilterCard;
