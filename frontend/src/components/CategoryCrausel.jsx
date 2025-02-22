import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { setSearchedQuery } from "@/Redux/Slices/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
  const categories = [
    "Software Engineer",
    "Product Manager",
    "Data Analyst",
    "HR Manager",
    "Marketing Specialist",
    "Sales Executive",
    "Chief Financial Officer",
    "IT Support Specialist",
    "UX/UI Designer",
    "Business Analyst",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        🔍 Explore Job Categories
      </h2>
      <Carousel className="w-full">
        <CarouselContent>
          {categories?.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="flex justify-center">
                <Button
                  onClick={() => searchHandler(category)}
                  className="bg-gradient-to-r from-[#6A38C2] to-[#441597] hover:from-[#441597] hover:to-[#6A38C2] rounded-full px-5 py-3 text-white text-sm font-semibold shadow-lg transition-all duration-300"
                >
                  {category}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-gray-700 hover:text-gray-900" />
        <CarouselNext className="text-gray-700 hover:text-gray-900" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
