import { NextResponse } from "next/server";
import { getUserByEmail } from "@/server/controllers/users";
import { getPagesByEmail } from "@/server/controllers/pages";

// Helper function to parse cookies
// function parseCookies(request) {
//   const cookieHeader = request.headers.get('cookie') || '';
//   return Object.fromEntries(cookieHeader.split('; ').map(cookie => cookie.split('=')));
// }

export async function POST(request) {
  const { email } = await request.json();

  // Manually parse cookies from the request headers
//   const cookies = parseCookies(request);
//   const authToken = cookies['customToken'];

  try {
    // if (!authToken) {
    //   // Redirect to the login page if the user is not authenticated
    //   return NextResponse.json(
    //     {
    //       message: 'User not login!',
    //     },
    //     { status: 401 }
    //   );;
    // }

    const user = await getUserByEmail(email);

    if (user) {
      const page = await getPagesByEmail(email);
      return NextResponse.json(
        {
          message: 'Page found successfully!',
          page: page,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error',
        error: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
