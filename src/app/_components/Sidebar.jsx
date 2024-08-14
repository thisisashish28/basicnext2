"use client";
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React, { useState } from 'react'

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='pl-2 pt-1 pr-2 pb-2'>
    <div className="pr-1h-screen w-64 bg-white text-black rounded-lg border-gray-400 shadow-lg">
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                <Image src="/images/logo.png" alt="logo" width={40} height={40} />
            </h1>
            <ul>
                <li className=''>
                    <div className={`${isOpen ? 'bg-gray-50' : 'bg-white'} mb-4 pt-4 pb-4 border rounded-md  shadow-md`}>
                    <a
                        href="#dashboard"
                        className={`${isOpen ? 'text-purple-500' : 'hover:text-gray-400'
                            } font-bold flex gap-2 items-center h-md text-lg p-4 rounded-md`}
                    >
                        <Image src="/images/icons/3-line.png" alt="Links" width={20} height={20} />
                        Links
                    </a>
                    </div>
                  
                </li>
                <li className="mb-4 pt-4 pb-4">
                    <a href="#profile" className="hover:text-gray-400 font-bold flex gap-2 items-center h-md text-lg">
                        <Image src="/images/icons/Shop-icon.png" alt="Shop" width={20} height={20} />
                        Shop</a>
                </li>
                <li className="mb-4 pt-4 pb-4">
                    <a href="#settings" className="hover:text-gray-400 font-bold flex gap-2 items-center h-md text-lg">
                        <Image src={"/images/icons/Appearance-icon.png"} alt="Appearance" width={20} height={20} />
                        Appearance</a>
                </li>
                <li className="mb-4 pt-4 pb-4">
                    <a href="#logout" className="hover:text-gray-400 font-bold flex gap-2 items-center h-md text-lg">
                        <Image src={"/images/icons/Analytics-icon.png"} alt="Analytics" width={20} height={20} />
                        Analytics</a>

                </li>
                <li className="mb-4 pt-4 pb-4">
                    <a href="#logout" className="hover:text-gray-400 font-bold flex gap-2 items-center h-md text-lg">
                        <Image src={"/images/icons/Settings-icon.png"} alt="Setting" width={20} height={20} />
                        Settings</a>
                </li>
                <li className='pt-8'>
                    <Card className='w-full bg-gray-200'>
                        <div className='p-md'>
                            <h2 className='pb-3 font-bold'>Try Pro for free &#128525;</h2>
                            <p>
                                Get advanced <br />customization and<br /> deeper audience <br /> insights to get more <br />visitors!
                            </p>
                            <div className='flex justify-start pt-md'>
                                <Button className='rounded-full h-90px w-90px'>Upgrade Now</Button>
                            </div>
                        </div>
                    </Card>
                </li>
                <li className="mb-4 pt-4 mt-md rounded-full">
                   <Card className='w-full bg-gray-200 rounded-full'>
                    <div className='p-md flex'><p>Username</p></div></Card>
                </li>
            </ul>
        </div>
    </div>
    </div>
  )
}

export default Sidebar
