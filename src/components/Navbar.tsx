'use client'
import React from 'react'
import ThemeToggleButton from './ui/theme-toggle-button'
import { useRouter } from "next/navigation";;
import { BiSolidBookAdd } from "react-icons/bi";
import Image from 'next/image';
import logo from '../app/assests/storynest.png'


const Navbar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/addstory");
  };


  return (
    <nav className='bg-transparent mt-10 flex justify-between p-2  '>
      <div className="flex items-center justify-center gap-2 cursor-pointer">

        <div>
          <Image src={logo} alt="storynest" width={100} height={100}
            className="drop-shadow-[0_0_8px_orange] hover:drop-shadow-[0_0_16px_orange]"
          />
        </div>

        <h1 className=" text-bold text-4xl font-serif tracking-widest hover:text-gradient
          hover:text-gradient-to-r hover:from-orange-400 hover:via-orange-500
           hover:to-red-500 
         ">
          StoryNest</h1>
        <div className='bg-[#F97316] h-2 w-2 rounded-full mt-4' ></div>
      </div>


      <div className="flex items-center gap-4 font-sans ">
        <button
          onClick={handleClick}
          className='flex gap-2 items-center text-green-600 md:text-white 
          cursor-pointer md:bg-green-600 md:px-4 md:py-2 md:rounded-4xl'>
          <BiSolidBookAdd className=" text-2xl  md:block " />
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