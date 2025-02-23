import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Footer = () => {
  return (
    <footer
      className="md:px-16 sm:px-10 px-4 pt-8 mt-12 pb-6 w-full text-gray-300 bg-gray-900 font-poppins flex flex-col gap-8"
      id="contact-us"
    >
      <div className="w-full grid md:grid-cols-[2fr_1fr_1fr] sm:grid-cols-3 gap-8 md:gap-[80px] md:p-4">
        {/* Developer Section */}
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-3xl font-bold text-white cursor-pointer">Developer</h1>
          <div className="flex items-center gap-3">
            <img
              src="https://www.netsolutions.com/insights/wp-content/uploads/2022/06/how-to-become-a-software-developer.webp"
              alt="Suraj Verma"
              className="w-12 h-12 rounded-full shadow-md"
            />
            <h1 className="text-xl font-bold text-white cursor-pointer">
              Suraj <span className="text-indigo-400">Verma</span>
            </h1>
          </div>

          <p className="leading-relaxed font-medium">
            Hi, I'm <span className="text-red-500">Suraj Verma</span>, <br />
            A skilled MERN stack developer with expertise in creating robust web
            solutions. I specialize in MongoDB, Express.js, React, and Node.js,
            delivering seamless and dynamic applications.
          </p>

          <div className="flex gap-4 mt-4">
            <Link to="https://www.linkedin.com/in/suraj-ver789" aria-label="LinkedIn" className="text-xl text-indigo-400 hover:text-indigo-600 transition-colors duration-300">
              <FaLinkedinIn />
            </Link>
            <Link to="https://github.com/Himanshu8825" aria-label="GitHub" className="text-xl text-indigo-400 hover:text-indigo-600 transition-colors duration-300">
              <FaGithub />
            </Link>
            <Link to="https://twitter.com/suraj_ver789" aria-label="Twitter" className="text-xl text-indigo-400 hover:text-indigo-600 transition-colors duration-300">
              <FaTwitter />
            </Link>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col ml-16 gap-5">
          <Link to="/">
            <h1 className="text-3xl font-bold text-white cursor-pointer">
              Hire<span className="text-red-500">Hub</span>
            </h1>
          </Link>

          <ul className="flex flex-col gap-2 text-gray-400">
            <li className="hover:text-white transition-colors duration-300">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-white transition-colors duration-300">
              <Link to="/">About Us</Link>
            </li>
            <li className="hover:text-white transition-colors duration-300">
              <Link to="/">Delivery</Link>
            </li>
            <li className="hover:text-white transition-colors duration-300">
              <Link to="/">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col ml-16 gap-5">
          <h2 className="text-2xl font-semibold text-white">Get In Touch</h2>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li>+91 8825151049</li>
            <li className="cursor-pointer text-xs">
              <Link to="mailto:kumarsurajverma6001@gmail.com" className="hover:text-white transition-colors duration-300">
                kumarsurajverma6001@gmail.com
              </Link>
            </li>
          </ul>


        </div>
      </div>

      <div className="w-full border-b-2 border-gray-700"></div>

      <p className="text-center text-gray-500">
        Copyright © 2024 HireHub. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
