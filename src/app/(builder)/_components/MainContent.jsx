import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react';

function MainContent() {
  return (
    <div className="bg-light-blue-500 w-full pl-10 pt-2">
      <Card className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
        <div className="flex justify-between gap-3">
          <p>Adding your Linktree to multiple bios can get you more clicks.</p>
          <Button variant="outline">Add Linktree</Button>
        </div>
      </Card>
    </div>
  );
}

export default MainContent;
