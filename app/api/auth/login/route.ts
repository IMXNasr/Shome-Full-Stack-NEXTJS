import User from "@/models/User";
import connect from "@/utils/connect";
import { sha1 } from "@/utils/functions";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
	try {
		await connect();
		const body = await request.json();
		const checkEmail = await User.findOne({ email: body.email });
		if (!checkEmail) return NextResponse.json("There's no user with this email !!", { status: 401 });
		if (checkEmail.password !== sha1(body.password)) return new Response("Password Wrong !!", { status: 401 });
    return NextResponse.json(checkEmail, { status: 200 });
	} catch (error) {
		return NextResponse.json(error as string, { status: 400 });
	}
};
