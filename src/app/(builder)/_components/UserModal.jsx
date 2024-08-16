"use client"
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import axios from 'axios'
import { useSession } from 'next-auth/react'
  
function UserModal() {
    const [pageName, setPageName] = useState('');
    const { data: session, status } = useSession();
    const handleSubmit = async (e) => {
        const email = session?.user?.email;
        e.preventDefault();
        console.log(pageName, email);
        await axios.post('/api/pagemaker-api', {name: pageName, email: email});
    }
  return (
    <div>
       <Dialog>
            <DialogTrigger>+ Add Link</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter Your Details</DialogTitle>
                <DialogDescription>
                 Please Enter your details to get started
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-3">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    <h2 className='font-bold h-md py-2'>Enter Page Name</h2>
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="page name"
                  />
                </div>
                {/* <div className="flex gap-3">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                   <h2  className='font-bold h-md py-2'>Password</h2>
                  </label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="********"
                  />
                </div> */}
                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    className="inline-flex 
                    justify-center py-2 
                    px-4 border border-transparent 
                    shadow-sm text-sm font-medium rounded-md 
                    text-white bg-secondary hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
    </div>
  )
}

export default UserModal
