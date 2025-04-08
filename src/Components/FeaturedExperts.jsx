import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { profileData } from '../assets/Data/data';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegStar, FaStar } from 'react-icons/fa';

const FeaturedExperts = () => {
    return (
        <section className='px-6 py-20 md:px-20'>

            <h2 className='text-gray-900 font-secondaryFont text-2xl sm:text-3xl md:text-4xl font-bold text-center'>Featured <span className='text-primary'>Laborly</span> Experts</h2>




            {/*  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 md:p-10">
                {profileData.slice(0, 8).map((profile) => (
                    <div
                        key={profile.id}
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border group cursor-pointer flex flex-col items-center text-center"
                    >
                        {/* Profile Image */}
                        <div className="relative w-52 h-52 mb-4">
                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Name & Location */}
                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold text-primary">{profile.name}</h3>
                            <p className="text-sm text-gray-500">{profile.location}</p>
                            <div className=" text-sm flex items-center justify-center m-auto my-2 text-center text-secondary">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span key={index}>
                                        {index < profile.rating ? (
                                            <FaStar className="text-center text-yellow-400" />
                                        ) : (
                                            <FaRegStar className="text-center text-yellow-400" />
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/*  */}
                        <div className='border-t-2 border-b-2 py-4'>
                            <p className='text-sm mt-2'>{profile.shortBio.slice(0, 50)}... </p>
                        </div>

                        {/* Skills */}
                        <div className="w-full mb-4">
                            <h5 className="text-sm font-medium text-gray-700 group-hover:text-primary mb-2">Skills</h5>
                            <ul className="flex flex-wrap justify-center gap-2">
                                {profile.skills.map((skill, idx) => (
                                    <li
                                        key={idx}
                                        className="bg-gray-100 group-hover:bg-white text-xs text-gray-800 px-3 py-1 rounded-full transition duration-300"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <button className="mt-auto btn btn-primary w-full group-hover:bg-white group-hover:text-primary group-hover:border group-hover:border-primary transition-all">
                            View Profile <IoEyeOutline className='text-xl' />
                        </button>
                    </div>
                ))}
            </div>



            <div className='flex items-center justify-center mx-auto my-5'>
                <button className=" btn btn-primary py-4 flex items-center w-[30%] text-center justify-center gap-3">View All <BsArrowRight /></button>
            </div>

        </section >
    )
}

export default FeaturedExperts
