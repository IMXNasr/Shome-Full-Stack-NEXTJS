import User from "@/models/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
	try {
		await connect();
		const allUsers = await User.find();
		return NextResponse.json(allUsers);
	} catch (error) {
		return NextResponse.json({ error });
	}
};
