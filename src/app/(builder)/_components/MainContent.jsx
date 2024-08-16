import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import React from 'react';
import UserModal from './UserModal';


function MainContent() {
  return (
    <div className="bg-light-blue-500 w-full pl-10 pt-2 ">
      <div className='w-1/2'>
        <Card className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between gap-3">
            <p>Adding your Linktree to multiple bios can get you more clicks.</p>
            <Button variant="outline">Add Linktree</Button>
          </div>
        </Card>
        <div className='pt-5xl'>
          <Button className="px-4 py-2 bg-secondary 
          text-white font-semibold text-center rounded-lg 
          shadow-md hover:bg-hover cursor-pointer w-full">
         <UserModal />
         </Button>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
