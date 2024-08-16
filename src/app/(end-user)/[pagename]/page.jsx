

"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

function Page({params}) {
    const { pagename } = params;
    //console.log(params);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/getPageEnd', {
                    pageName: pagename
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (pagename) {
            fetchData();
        }

    }, [pagename]);

    return (
        <div className='w-full h-screen bg-gray-600'>
            <div className='justify-center items-center'>
                {data ? (<div>

                </div>) : null}
                <div className='pt-xl flex items-center justify-center font-bold text-3xl text-white'>
                    <h1>{data ? data?.page?.userDetails.full_name : ''}</h1>
                </div>
                <div className='pt-lg pb-lg flex justify-center items-center gap-3 '>
                    <div className='bg-white rounded-full p-2 flex justify-center items-center w-500
                                   h-500 text-black cursor-pointer'>
                        Links </div>
                    <div className='bg-white rounded-full p-2 flex justify-center items-center w-500
                                   h-500 text-black cursor-pointer'>
                        Shop</div>
                </div>
            </div>
        </div>
    );
}

export default Page;
