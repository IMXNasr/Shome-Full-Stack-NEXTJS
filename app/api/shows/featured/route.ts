import Show from "@/models/Show";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
	try {
		await connect();
		const shows = await Show.find({ featured: true }).sort({ date_added: -1 });
		return NextResponse.json(shows, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 404 });
	}
};
