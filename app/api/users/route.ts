import User from "@/models/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
	try {
		await connect();
		const allUsers = await User.find();
		return NextResponse.json(allUsers, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
