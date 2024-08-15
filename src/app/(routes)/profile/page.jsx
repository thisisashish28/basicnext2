"use client";

import Sidebar from "@/app/_components/Sidebar";
import MainContent from "./_components/MainContent";


function profile() {
  
    return (
        <div className='flex' style={{ backgroundColor: '#f0f0ff' }}>
         <Sidebar className='w-1/4' />
         <MainContent className='w-3/4' />
        </div>
    )
}

export default profile
