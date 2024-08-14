"use client";

import { SessionProvider } from 'next-auth/react';

// Define the AuthProvider component
export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
