import { makePage } from "@/server/controllers/pages";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, email } = await request.json();
    try {
        const page = await makePage(name, email);
        console.log(page, email);
        if (page) {
            return NextResponse.json(
                { message: 'Page created successfully!' },
                { status: 200 }
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