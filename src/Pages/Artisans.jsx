import React, { useContext, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { nigeriaStates, profileData } from '../assets/Data/data';
import { ArtisanContext } from '../Contexts/ArtisansContext';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { PiFunnelSimple } from 'react-icons/pi';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
// 
const Artisans = () => {
  const navigate = useNavigate()
  const { categories } = useContext(ArtisanContext)
  const [filterItems, setFilterItems] = useState(profileData)
  const [selectedState, setSelectedState] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showModal, setShowModal] = useState(false)

  // 
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  // Function to filter artisans by category
  const filterArtisanCategory = (category) => {
    let filtered = category === "All" ? profileData : profileData.filter((data) => (data.role) === category)
    setFilterItems(filtered)
    console.log(filterItems)
  }

  // Function to filter artisans by state

  const filterArtisanState = (state) => {
    setSelectedState(state)
    let filteredState = state === "" ? profileData : profileData.filter((data) => (data.location) === state)
    setSelectedState(filteredState)
  }
  return (
    <>
      <section className="container">

        {/* Filter Header */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between bg-white p-5 rounded-xl w-full shadow-md">
          {/* State Filter */}
          <div className="flex items-center">

            <select
              name="state"
              id="state"
              value={selectedState}
              onChange={(e) => filterArtisanState(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">-- Select State --</option>
              {nigeriaStates.map((state, idx) => (
                <option key={idx} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="text-gray-600 hover:primary">
              <LuSearch size={20} />
            </button>
          </div>
        </div>



        <div className="py-10 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5  gap-5 lg:gap-8">

          {/* Desktop Category section */}
          <div className='bg-white rounded-xl p-3 md:p-6 soft-shadow md:col-span-1'>
            <div className="hidden md:block">

              <h3 className="text-center text-lg text-darkPrimary">All Categories</h3>

              <ul className='flex flex-col mt-10 gap-4'>
                {categories.map((data, index) => (
                  <li onClick={() => filterArtisanCategory(data)} key={index} className="cursor-pointer list-none text-[0.8rem]  p-2 hover:bg-primary hover:text-white rounded-md transition">{data}</li>
                ))}
              </ul>
            </div>

            {/* Category modal for mobile screen */}

            <div className="flex items-center justify-between md:hidden mb-4 px-2">
              <h3 className="text-[1.3rem] font-semibold text-darkPrimary">Select Category</h3>
              <div onClick={toggleModal} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-primary bg-opacity-20 shadow-xl duration-500 transition-all hover:bg-primary hover:text-white">
                <IoIosArrowDown className="text-2xl" />
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-40">
              <div className="bg-white w-11/12 max-w-sm rounded-lg soft-shadow p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-6 text-center">Select Category</h3>
                <ul className="max-h-60 overflow-y-auto text-sm">

                  {categories.map((data, index) => (
                    <li onClick={() => { filterArtisanCategory(data); setShowModal(false) }} key={index} className="cursor-pointer list-none text-[0.8rem]  p-2 hover:bg-primary hover:text-white rounded-md transition">{data}</li>
                  ))}

                </ul>
                <button
                  className="w-full mt-4 bg-primary text-sm text-white py-3 rounded-md hover:bg-darkPrimary transition"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}



          {/* Artisans section */}
          <div className="bg-white rounded-xl p-6 soft-shadow md:col-span-3 xl:col-span-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterItems.slice(0, 6).map((profile) => (
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
                    <p className="text-sm text-gray-500">{profile.role}</p>
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
                  <div className='border-t-2 border-b-2 py-2'>
                    <p className='text-sm '>{profile.shortBio.slice(0, 50)}... </p>
                  </div>

                  {/* Skills */}
                  <div className="w-full mb-4">
                    <h5 className="text-sm font-medium text-gray-700 group-hover:text-primary my-2">Skills</h5>
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
                  <button onClick={() => navigate(`/artisans/${profile.id}`)}
                    className="mt-auto btn btn-primary w-full group-hover:bg-white group-hover:text-primary group-hover:border group-hover:border-primary transition-all">
                    View Profile <IoEyeOutline className='text-xl' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>




      </section >
      <Footer/>

    </>
  )
}

export default Artisans