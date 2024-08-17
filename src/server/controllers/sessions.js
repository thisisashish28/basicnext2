import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function checkSession() {
    const cookieStore = cookies(); // Access cookies on the server side
     // console.log('All cookies:', cookieStore.getAll());
    const authToken = cookieStore.get('customToken');
    // console.log('authToken:', authToken);
    if(!authToken) {
        return false
    }
    return true;
}
