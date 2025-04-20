import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import logo from "../../assets/laborly-logo.png";

const Footer = () => {
    return (
        <footer
            className="bg-gray-50 w-full mt-auto">
            {/* Newsletter Section */}
            <div
                className="w-[90%] md:w-[80%] mx-auto bg-white rounded-xl shadow-2xl soft-shadow p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-6 lg:gap-16 -translate-y-12"
            >
                {/* Text Content */}
                <div className="text-center md:text-left">
                    <h2 className="text-primary text-xl font- sm:text-2xl font-extrabold font-secondary mb-2">
                        Don’t Stress. Hire the Best with Laborly!
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md">
                        Join our newsletter to get exclusive updates, special offers, and tips on how to make the most of your home projects.
                    </p>
                </div>

                {/* Input & Button */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-4">
                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        className="w-full lg:w-[500px] max-w-full px-4 py-3 border border-secondary rounded-lg text-gray-600 outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
                    />
                    <button
                        className="flex items-center justify-center w-full px-6 py-4 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-all duration-300"
                    >
                        Subscribe <IoIosSend className="ml-2 text-base" />
                    </button>
                </div>
            </div>


            {/* Footer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-16 px-10 gap-8">
                {/* Logo & Socials */}
                <div
                    className="" >

                    <img src={logo} alt="Medinsight logo" className="max-w-[7rem]" />


                    <div className="flex items-center justify-start gap-6 mt-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center w-10 h-10 border border-primary bg-transparent rounded-full text-priary text-lg transition-all duration-500 hover:bg-primary hover:border-white hover:text-white hover:scale-110"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center w-10 h-10 border border-primary bg-transparent rounded-full text-priary text-lg transition-all duration-500 hover:bg-primary hover:border-white hover:text-white hover:scale-110"
                        >
                            <RiInstagramFill />
                        </a>

                        <a
                            href="https://pinterest.com"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center w-10 h-10 border border-primary bg-transparent rounded-full text-priary text-lg transition-all duration-500 hover:bg-primary hover:border-white hover:text-white hover:scale-110"
                        >
                            <FaPinterestP />
                        </a>
                    </div>


                </div>

                {/* Explore Section */}
                <div
                    className="space-y-4"

                >
                    <h3 className="font-otherFont text-xl text-darkPrimary">Explore</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-700 hover:text-primary transition-all duration-300">
                            <IoIosArrowRoundForward />

                            <Link to ="/artisans" className="text-gray-700 text-sm">Find a Handyman</Link>
                        </li>
                        <li className="flex items-center gap-2 text-gray-700 hover:text-primary transition-all duration-300">
                            <IoIosArrowRoundForward />

                            <Link to="/blog" className="text-gray-700 text-sm">Blog</Link>
                        </li>

                    </ul>
                </div>

                {/* Quick Links */}

                <div
                    className="space-y-4"

                >
                    <h3 className="font-otherFont text-xl text-darkPrimary">Quick Links</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-700 hover:text-primary transition-all duration-300">
                            <IoIosArrowRoundForward />

                            <Link to="/" className="text-gray-700 text-sm">For Artisans</Link>
                        </li>
                        <li className="flex items-center gap-2 text-gray-700 hover:text-primary transition-all duration-300">
                            <IoIosArrowRoundForward />

                            <Link to ="/" className="text-gray-700 text-sm">For Clients</Link>
                        </li>
                    </ul>
                </div>
                {/* Contact Section */}
                <div
                    className="space-y-4">
                    <h3 className="font-otherFont text-xl text-darkPrimary">Get In Touch</h3>
                    <div className="space-y-2">

                        <div className="flex items-center gap-2 text-gray-700">
                            <MdEmail className="text-xl" />
                            <p className="text-sm ">support@laborly.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div
                className="text-center py-4 text-darkPrimary text-sm border-gray-700 border-t-[.5px]"

            >
                &copy; {new Date().getFullYear()} Copyright Laborly | All Rights Reserved.
            </div>
        </footer >
    );
};

export default Footer;
