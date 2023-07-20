import User from "@/models/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request, { params: { id } }: { params: { id: string } }) => {
	try {
		await connect();
		const user = await User.findOne({ _id: id });
		return NextResponse.json(user.wishlist, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
