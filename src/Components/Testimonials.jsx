
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Icons for full, half, and empty stars
import { testimonials } from "../assets/Data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { RiAccountPinCircleFill } from "react-icons/ri";

const Testimonials = () => {
    return (
        <section>
            <div className="container text-center">

                <h2>What our users say about us</h2>


                <div className="">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={10}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false, // Keep autoplay running even after interaction
                        }}
                        speed={2000}
                        loop={true}
                        modules={[Autoplay]}
                        breakpoints={{
                            1200: {
                                slidesPerView: 3, // 2 slides for desktop
                            },
                            900: {
                                slidesPerView: 2, // 2 slides for tablets
                            },
                            0: {
                                slidesPerView: 1, // 1 slide for mobile
                            },

                        }}
                        className="w-full px-30">
                        {testimonials.map((testimonial) => (
                            <SwiperSlide
                                key={testimonial.id}
                                className="flex flex-col relative items-center justify-start gap-3 py-8  px-4 rounded-xl bg-white soft-shadow my-14  cursor-pointer">
                                {/* Image container */}
                                <div className="w-14 h-14 flex items-center justify-center m-auto rounded-full border-4 border-white shadow-lg  ">
                                    <RiAccountPinCircleFill className="text-2xl" />
                                </div>

                                <div>
                                    {/* Testimonial content */}
                                    <p className="text-xm text-center text-gray-600 mt-5 text-sm">
                                        {testimonial.message}
                                    </p>
                                    <h3 className="text-center text-xl mt-5 text-darkPrimary">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-primary text-xm text-center text-xs">
                                        {testimonial.role}
                                    </p>
                                    <div className=" text-sm flex items-center justify-center m-auto my-2 text-center text-secondary">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <span key={index}>
                                                {index < testimonial.rating ? (
                                                    <FaStar className="text-center" />
                                                ) : (
                                                    <FaRegStar className="text-center" />
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
