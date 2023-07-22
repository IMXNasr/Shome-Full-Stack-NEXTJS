import Show from "@/models/Show";
import User from "@/models/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request, { params: { id } }: { params: { id: string } }) => {
	try {
		await connect();
		const user = await User.findOne({ _id: id });
		const shows = (await Show.find({ _id: { $in: user.watchlist } }).select("id name type image rating")).reverse();
		return NextResponse.json(shows, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
