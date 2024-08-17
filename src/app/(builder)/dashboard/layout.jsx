// src/app/dashboard/layout.jsx
import React from 'react';
import Sidebar from '../_components/Sidebar';
import { checkSession } from '@/server/controllers/sessions';
import { redirect } from 'next/navigation';

export default async function Layout({ children }) {
  const session = await checkSession();
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex" style={{ backgroundColor: '#f0f0ff' }}>
      <Sidebar />
      {children}
    </div>
  );
}
