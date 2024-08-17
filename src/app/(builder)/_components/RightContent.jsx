"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

function RightContent() {
  const [data, setData] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.email) {
          const response = await axios.post('/api/getpage-admin', {
            email: session.user.email,
          });
          if (response.status === 200) {
            setData(response.data);
          } else {
            router.push('/login'); // Redirect to login using useRouter
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/login'); // Redirect to login if there's an error
      }
    };

    // Fetch data only when the session is available
    if (session?.user?.email) {
      fetchData();
    }
  }, [session, router]);

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
  );
}

export default RightContent;
