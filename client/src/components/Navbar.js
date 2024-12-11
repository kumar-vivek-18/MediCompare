import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/profileIcon.svg"
import CartIcon from "../assets/cartIcon.svg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search-results?query=${searchTerm}`);
    }
  };

  return (
    <nav className="w-full z-50 fixed top-0 right-0 left-0  bg-white text-black py-[20px] max-md:px-[20px]  md:px-[30px] flex flex-col md:flex-row items-center justify-center border-b-[1px] border-[#666666] shadow-xl">
      <div className="w-full max-w-[1200px] flex flex-col max-md:gap-4 md:flex-row items-center md:justify-between">
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1
            className="text-2xl poppins-bold text-[#28A745] cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            DawaBiro
          </h1>

          <div className="flex md:hidden items-center space-x-4 ">
          <img src={ProfileIcon} alt="Profile" width={24} height={24} />
<img src={CartIcon} alt="Cart" width={24} height={24} />

          </div>
          {/* <button
          className="md:hidden text-[#28A745] text-xl focus:outline-none"
          onClick={toggleNavbar}
        >
          <FaBars />
        </button> */}
        </div>
        <div>
          <div className="flex max-md:w-[300px] md:w-[400px] items-center bg-white text-black  md:mx-4 border-[1px] rounded-md border-[#9b9b9b]">
            <input
              type="text"
              placeholder="Search medicine, medical products...."
              className="bg-transparent w-[85%] py-2 px-2 text-[#666666] outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <div
              className="flex w-[15%] py-2 px-2 mx-[5px] cursor-pointer justify-center rounded-md items-center bg-[#28A745]"
              onClick={handleSearch}
            >
              <FaSearch color={"white"} />
            </div>
          </div>
        </div>

        {/* Collapsible Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } hidden  w-full md:flex md:items-center md:w-auto mt-4 md:mt-0`}
        >
          {/* Search Bar */}

          {/* Icons Section */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <img src={ProfileIcon} alt="Profile" width={24} height={24} />
<img src={CartIcon} alt="Cart" width={24} height={24} />

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
