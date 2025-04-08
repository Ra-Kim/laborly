import React, { useState } from "react";
import logo from "../assets/laborly-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { HiChevronRight } from "react-icons/hi";
const NavBar = () => {
    const [showNavbar, setShowNavbar] = useState(false);

    const navgigate = useNavigate()

    //function to toggle Navbar
    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    };


    // function to remove menu bar

    return (
        <div className="fixed top-0 w-full z-50">
            <div className="w-full static z-50 flex items-center justify-between bg-white py-3 px-5 sm:py-3 sm:px-10 soft-shadow">
                {/* Logo */}
                <div>
                    <img
                        src={logo}
                        alt="Laborly-logo"
                        className="w-[3rem] sm:w-[5rem] md:w-[7rem] max-w-24"
                    />
                </div>

                {/* Menu */}
                <div className="hidden lg:flex">
                    <ul className="flex items-center justify-center text-[.9rem] gap-5 md:gap-10  ">
                        <NavLink to="/">
                            <li>Home</li>
                        </NavLink>

                        <NavLink to="artisans">
                            <li>Find an Artisan</li>
                        </NavLink>
                        <NavLink to="">
                            <li> Post A Job</li>
                        </NavLink>
                        <NavLink to="blog">
                            <li>Blog</li>
                        </NavLink>
                    </ul>
                </div>

                {/* Buttons */}

                <div className="flex items-center justify-center gap-4 sm:gap-8">

                    <button onClick={() => navgigate('/artisans-sign-up')} className="btn btn-primary">
                        Create an Account <IoIosSend />
                    </button>

                    {/* Menu Icon */}
                    <button onClick={toggleNavbar} className="inline-block lg:hidden">
                        {showNavbar ? <IoClose className="text-primary hover:text-secondary hover:border-secondary transition-all duration-300 text-[2.5rem]" /> : <IoMenu className="text-primary hover:text-secondary hover:border-secondary transition-all duration-300 text-[2.5rem]" />}
                        {/* <IoMenu className="text-primary hover:text-secondary hover:border-secondary transition-all duration-300 text-[2.5rem]" /> */}
                    </button>
                </div>
            </div>

            {/* Mobile Navbar */}
            {showNavbar && (

                <div className="fixed left-0 top-0 bottom-0 w-[16rem] h-screen bg-white p-10 z-50 lg:hidden soft-shadow rounded-tr-[20px] rounded-br-[20px] ">

                    {/* Logo */}
                    <div>
                        <img
                            src={logo}
                            alt="Laborly logo"
                            className="w-[3rem] sm:w-[5rem] md:w-[7rem] max-w-24"
                        />
                    </div>
                    <ul className="pt-20 p-5 flex flex-col items-left justify-center text-base gap-12 font-normal text-primary">
                        <NavLink to="/" onClick={toggleNavbar}>
                            <li className="flex justify-between items-center group hover:text-secondary transition duration-300">Home
                                <HiChevronRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                            </li>
                        </NavLink>

                        <NavLink to="artisans" onClick={toggleNavbar}>
                            <li className="flex justify-between items-center group hover:text-secondary transition duration-300">Find an Artisan <HiChevronRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" /></li>
                        </NavLink>
                        <NavLink to="" onClick={toggleNavbar}>
                            <li className="flex justify-between items-center group hover:text-secondary transition duration-300">Post a Job <HiChevronRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" /></li>
                        </NavLink>
                        <NavLink to="blog" onClick={toggleNavbar}>
                            <li className="flex justify-between items-center group hover:text-secondary transition duration-300">Blog <HiChevronRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" /></li>
                        </NavLink>
                    </ul>
                </div>

            )
            }
        </div >


    );
};

export default NavBar;
