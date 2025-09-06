'use client'
import React from 'react'
import ThemeToggleButton from './ui/theme-toggle-button'
import { IoIosAddCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation"; ;
import { BiSolidBookAdd } from "react-icons/bi";



const Navbar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/addstory"); 
  };


  return (
    <nav className='bg-transparent mt-10 flex justify-between  '>
      <div className="flex items-center justify-center gap-4 cursor-pointer">
        <h1 className=" text-bold text-4xl font-serif tracking-widest hover:text-gradient
          hover:text-gradient-to-r hover:from-orange-400 hover:via-orange-500 hover:to-red-500 
         ">StoryNest</h1>
        <div className='bg-[#F97316] h-2 w-2 rounded-full mt-4' ></div>
      </div>


      <div className="flex items-center gap-4 font-sans ">
        <button 
        onClick={handleClick}
        className='flex gap-2 items-center  text-white
          cursor-pointer md:bg-green-600 md:px-4 md:py-2 md:rounded-4xl'>
          <BiSolidBookAdd className=" text-2xl " />
          <span className='hidden md:block'> Story</span>
        </button>

        <div className="cursor-pointer">
          <ThemeToggleButton />
        </div>
      </div>


    </nav>
  )
}

export default Navbar