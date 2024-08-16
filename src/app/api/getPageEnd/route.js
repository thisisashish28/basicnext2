import { NextResponse } from "next/server";
import { getPages } from "@/server/controllers/pages";
export async function POST(request) {
    const { pageName } = await request.json();
    try {
        const page = await getPages(pageName);
        if (page) {
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