"use client";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import UserModal from './UserModal';
import { useSession } from 'next-auth/react';
import axios from 'axios'; // Make sure to import axios
import Link from 'next/link';

function MainContent() {
  const [data, setData] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.email) {
          const response = await axios.post('/api/getpage-admin', {
            email: session.user.email
          });
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data only when the session is available
    if (session?.user?.email) {
      fetchData();
    }
  }, [session]); // Use `session` as a dependency

  return (
    <div className="bg-light-blue-500 w-full pl-10 pt-2">
      <div className='flex gap-10'>
        <div className='w-1/2'>
          <Card className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <div className="flex justify-between gap-3">
              <p>Adding your Linktree to multiple bios can get you more clicks.</p>
              <Button variant="outline">Add Linktree</Button>
            </div>
          </Card>
          <div className='pt-5'>
            <Button className="px-4 py-2 bg-secondary 
            text-white font-semibold text-center rounded-lg 
            shadow-md hover:bg-hover cursor-pointer w-full">
              <UserModal />
            </Button>
          </div>
        </div>
        {/* preview */}
        <div>
          <Card className="p-6 w-full max-w-md border border-gray-300 rounded-lg shadow-lg bg-white">
            <div>
              <p className="text-lg font-semibold p-3">{data?.page?.pageName}</p>
              <Button variant="outline">
              <Link href={`/${data?.page?.pageName}`}>Go to Page</Link>
              </Button>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default MainContent;
