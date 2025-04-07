import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import manImage from '../assets/man-image.png'
import CategorySection from '../Components/CategorySection';
const Home = () => {
  return (
    <>
      <section className="w-full min-h-screen px-6 md:px-20 py-16 flex flex-col-reverse md:flex-row items-center justify-center gap-10 bg-gradient-to-br from-[#f1f7ff] to-white">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="font-secondaryFont font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
            Find quality Handymen fast with <span className="text-primary">Laborly.</span>
          </h2>

          <p className="mt-4 text-gray-600 text-base md:text-lg leading-[1.4] md:leading-[1.2]  max-w-xl">
            Laborly helps you find a wide range of professional handymen with zero hassles. Get tasks done easily!
          </p>

          <div className="mt-6">
            <button className="btn btn-primary flex items-center gap-2">
              Get Started <BsArrowRight className="text-lg" />
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={manImage} alt="Handyman illustration" className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl w-full object-contain" />
        </div>
      </section>
      {/*  */}
      <CategorySection />



    </>
  )
}

export default Home