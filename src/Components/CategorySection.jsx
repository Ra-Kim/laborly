import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import { artisanCategories } from '../assets/Data/data';
import { IoArrowForwardOutline } from "react-icons/io5";
const CategorySection = () => {
    return (
        <>
            <section className='px-6 py-10 md:px-20'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-gray-900 font-secondaryFont text-2xl sm:text-3xl md:text-4xl font-bold text-center'>Explore by <span className='text-primary'>category</span> </h3>
                    <div>
                        <h5 className='flex items-center justify-center gap-3 font-normal text-primary text-[.7rem] sm:text-sm'>Show all<BsArrowRight /></h5>
                    </div>
                </div>

                {/*  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
                    {artisanCategories.slice(0, 6).map((categoryData) => {
                        const Icon = categoryData.icon;
                        return (
                            <div
                                key={categoryData.id}
                                className="group p-5 rounded-xl bg-white soft-shadow hover:bg-primary hover:text-white transition-all duration-1000 border hover:border-primary cursor-pointer"
                            >
                                <div className="text-primary text-3xl mb-3 group-hover:text-white">
                                    <Icon />
                                </div>

                                <div>
                                    <h6 className="text-lg font-semibold text-gray-800 group-hover:text-white">
                                        {categoryData.title}
                                    </h6>
                                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-1 group-hover:text-white">
                                        {categoryData.providers} providers available
                                        <IoArrowForwardOutline className="text-base transition-transform group-hover:translate-x-1" />
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </section>

        </>
    )
}

export default CategorySection
