import React from 'react'
import ThemeToggleButton from './ui/theme-toggle-button'
import { IoIosAddCircleOutline } from "react-icons/io";

const Navbar = () => {
  return (
   <nav className='bg-transparent mt-10 flex justify-between  '>
      <div className="flex items-center justify-center gap-4 cursor-pointer">
         <h1 className=" text-bold text-4xl font-serif tracking-widest hover:text-gradient
          hover:text-gradient-to-r hover:from-orange-400 hover:via-orange-500 hover:to-red-500 
         ">StoryNest</h1>
         <div className='bg-[#F97316] h-2 w-2 rounded-full mt-4' ></div>
      </div>
     

 <div className="flex items-center gap-4 font-sans">
  <button className='flex gap-2 items-center bg-orange-600 px-4 py-2 rounded-4xl'>
   <IoIosAddCircleOutline className=" text-2xl" />
  <span>Add Story</span>
  </button>

  <div className="cursor-pointer">
    <ThemeToggleButton />
  </div>
</div>
     

   </nav>
  )
}

export default Navbar