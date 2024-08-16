'use client';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { sidebarRoutes } from '@/config/routes/sidebarRoutes';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className=" w-1/4  p-2">
      <div className="h-screen w-64 bg-white text-black rounded-lg border-gray-400 shadow-lg">
        <div className="p-6 min-h-[90vh] flex flex-col justify-between overflow-auto">
          <div className="h-full">
            <h1 className="text-2xl font-bold mb-6">
              <Image src="/images/logo.png" alt="logo" width={40} height={40} />
            </h1>
            <div className="flex flex-col gap-2">
              {sidebarRoutes.map((route) => (
                <div
                  key={route.name}
                  className={`${
                    isOpen ? 'bg-gray-50' : 'bg-white'
                  } mb-4 pt-4 pb-4 border rounded-md  shadow-md`}
                >
                  <Link
                    href={route.href}
                    className={`${
                      isOpen ? 'text-purple-500' : 'hover:text-gray-400'
                    } font-bold flex gap-2 items-center h-md text-lg p-4 rounded-md`}
                  >
                    <Image
                      src={`/images/icons/${route.icon}.png`}
                      alt={route.name}
                      width={20}
                      height={20}
                    />
                    {route.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4 pt-4 mt-md rounded-full">
            <Card className="w-full bg-gray-200 rounded-full">
              <div className="p-md flex">
                <p>Username</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
