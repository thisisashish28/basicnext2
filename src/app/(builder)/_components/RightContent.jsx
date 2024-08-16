"use client";

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import axios from 'axios'; // Make sure to import axios
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function RightContent() {
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
      }, [session]);
  return (
    <div className='bg-light-blue-500 pl-10 pt-2 w-1/2'>
          <Card className="pl-4xl pr-xl pt-4 pb-6 w-full max-w-md border border-gray-300 rounded-lg shadow-lg bg-white">
            <div>
              <p className="text-lg font-semibold p-3">{data?.page?.pageName}</p>
              <Button variant="outline">
              <Link href={`/${data?.page?.pageName}`}>Go to Page</Link>
              </Button>
            </div>
          </Card>
    </div>
  )
}

export default RightContent
