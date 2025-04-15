import React, { useContext, useEffect, useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { IoIosSend } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import { ArtisanContext } from '../Contexts/ArtisansContext'
import { MdLocationPin } from 'react-icons/md'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Footer from '../Components/Footer'
import { IoEyeOutline } from 'react-icons/io5'

const ArtisanProfile = () => {
    const navigate = useNavigate()
    const { artisanId } = useParams()
    const { profileData } = useContext(ArtisanContext)
    const [artisanInfo, setArtisanInfo] = useState(null)
    // 
    const fetchArtisanData = async () => {
        const artisanData = profileData.find(artisan => artisan.id === Number(artisanId))
        setArtisanInfo(artisanData)
        console.log(artisanInfo)
    }

    useEffect(() => {
        fetchArtisanData()
    }, [profileData, artisanId])

    if (!artisanInfo) {
        return <div className='container'> Details Not Found!</div>
    }



    return (
        <>
            <div className='container'>


                <div
                    key={artisanInfo.id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border group cursor-pointer flex flex-col md:flex-row gap-6 mt-10"
                >
                    {/* Profile Image */}
                    <div className="relative w-full md:w-80 h-72 md:h-80 mx-auto md:mx-0">
                        <img
                            src={artisanInfo.image}
                            alt={artisanInfo.name}
                            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Profile Details */}
                    <div className="flex-1 flex flex-col justify-between gap-6">
                        {/* Name, Location, Experience */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-primary">{artisanInfo.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{artisanInfo.experience}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <MdLocationPin className="text-lg" /> {artisanInfo.location}
                                </p>
                            </div>

                            {/* Ratings & Jobs */}
                            <div className="flex flex-col sm:items-end">
                                <span className="text-sm text-gray-600">Jobs Completed: {artisanInfo.jobsCompleted}</span>
                                <div className="flex mt-2">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span key={index}>
                                            {index < artisanInfo.rating ? (
                                                <FaStar className="text-yellow-400" />
                                            ) : (
                                                <FaRegStar className="text-yellow-400" />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="border-t border-b py-4 text-sm text-gray-700 leading-relaxed">
                            {artisanInfo.shortBio}
                        </div>

                        {/* Skills */}
                        <div>
                            <h5 className="text-sm font-semibold text-gray-800 mb-2">Skills</h5>
                            <ul className="flex flex-wrap gap-2">
                                {artisanInfo.skills.map((skill, idx) => (
                                    <li
                                        key={idx}
                                        className="bg-gray-100 text-xs text-gray-800 px-3 py-1 rounded-full hover:bg-primary hover:text-white transition duration-300"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full mt-2 py-3 bg-primary text-white rounded-lg flex items-center justify-center gap-2 hover:bg-white hover:text-primary hover:border hover:border-primary transition-all">
                            Message <IoIosSend className="text-xl" />
                        </button>
                    </div>
                </div>


                {/* Related Services */}

                <div className='p-5 rounded-xl bg-white mt-10' >
                    <h4 className='text-primary mb-5'>View Related Services</h4>

                    <div className="">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={10}
                            autoplay={{
                                delay: 6000,
                                disableOnInteraction: false, // Keep autoplay running even after interaction
                            }}
                            speed={2000}
                            loop={true}
                            modules={[Autoplay]}
                            breakpoints={{
                                // Mobile (default)
                                0: {
                                    slidesPerView: 1,
                                },

                                // Small tablets and larger phones
                                600: {
                                    slidesPerView: 2,
                                },

                                // Tablets
                                900: {
                                    slidesPerView: 3,
                                },

                                // Desktop and larger
                                1200: {
                                    slidesPerView: 4,
                                },
                            }}

                            className="w-full px-30">
                            {profileData.slice(0, 8).map((profile) => (
                                <SwiperSlide
                                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border group cursor-pointer flex flex-col items-center text-center"
                                >
                                    {/* Profile Image */}
                                    <div className="relative w-52 h-52 mb-4 mx-auto">
                                        <img
                                            src={profile.image}
                                            alt={profile.name}
                                            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 mx-auto"
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
                                            {profile.skills.slice(0, 3).map((skill, idx) => (
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
                                    <button
                                        onClick={() => navigate(`/artisans/${profile.id}`)}
                                        key={profile.id}
                                        className="mt-auto btn btn-primary w-full group-hover:bg-white group-hover:text-primary group-hover:border group-hover:border-primary transition-all">
                                        View Profile <IoEyeOutline className='text-xl' />
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}

export default ArtisanProfile
