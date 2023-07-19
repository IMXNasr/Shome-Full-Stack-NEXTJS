import User from "@/models/User";
import connect from "@/utils/connect";
import { sha1 } from "@/utils/functions";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
	try {
		await connect();
		const body = await request.json();
		const user = {
			name: body.name,
			username: body.username,
			email: body.email,
			password: sha1(body.password),
		};
		const checkUsername = await User.findOne({ username: user.username });
		const checkEmail = await User.findOne({ email: user.email });
		if (checkUsername) return NextResponse.json("There's a User with the same username", { status: 401 });
		if (checkEmail) return NextResponse.json("There's a User with the same email", { status: 401 });
		await User.create(user);
		return NextResponse.json("User created successfully !!", { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
