import React from 'react'
import { Typewriter } from 'react-simple-typewriter';
import { BsArrowRight } from "react-icons/bs";
import manImage from '../assets/man-image.png'
import clientImage from '../assets/client.png'
import CategorySection from '../Components/CategorySection';
import Footer from '../Components/Footer';
import Testimonials from '../Components/Testimonials';
import FeaturedExperts from '../Components/FeaturedExperts';
const Home = () => {
  return (
    <>
      <section className="w-full min-h-screen px-6 md:px-20 py-16 flex flex-col-reverse md:flex-row items-center justify-center gap-10 bg-gradient-to-br from-[#f1f7ff] to-white">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">

          <h2 className="font-secondaryFont font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-center md:text-left">
            Find quality{' '}
            <span className="text-primary">
              <Typewriter
                words={['Handymen', 'Plumbers', 'Electricians', 'Painters']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={200}
                deleteSpeed={100}
                delaySpeed={1200}
              />
            </span>{' '}
            fast with <span className="text-primary">Laborly.</span>
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
      {/*  */}
      <FeaturedExperts />
      <section className="grid grid-cols-1 md:grid-cols-2 bg-darkPrimary rounded-lg mx-auto w-[90%] px-6 md:px-14 py-10 text-gray-50 relative overflow-visible">
        {/* Text Content */}
        <div className="flex flex-col justify-center z-10">
          <h2 className="text-5xl text-gray-50 md:text-6xl lg:text-6xl font-bold mb-4 max-w-md leading-tight">
            Hire an expert Labourer today!
          </h2>
          <p className="text-[.7rem] sm:text-sm text-gray-200 leading-relaxed max-w-sm">
            Connect with skilled and reliable labourers near you—ready to tackle your
            home repairs, installations, or maintenance tasks with precision and care.
            Fast, easy, and stress-free hiring starts here.
          </p>

          <div className="mt-6">
            <button className="btn btn-primary flex items-center gap-2 hover:bg-white hover:text-primary transition-all">
              Get Started For Free! <BsArrowRight className="text-lg" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex items-end justify-end mt-10 ml-50 md:mt-0">
          <img
            src={clientImage}
            alt="Labourer"
            className="w-[30rem] max-w-lg -mt-20 md:-mt-28 lg:-mt-36 z-20 "
          />
        </div>
      </section>

      {/*  */}
      <Testimonials />

      <Footer />
    </>
  )
}

export default Home