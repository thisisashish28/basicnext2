import { NextResponse } from "next/server";
import { getUserByEmail } from "@/server/controllers/users";
import { getPagesByEmail } from "@/server/controllers/pages";
export async function POST(request) {
    const { email } = await request.json();
    try {
        const user = await getUserByEmail(email);
       
        if (user) {
            const page = await getPagesByEmail(email);
            return NextResponse.json({
                message: 'Page found successfully!',
                page: page,
            },
            { status: 200 }
            );
        }
    }
    catch(error){
        return NextResponse.json({
            message: 'Error',
            error: error.message || 'An unexpected error occurred',
        },
        { status: 500 }
        );
    }
}