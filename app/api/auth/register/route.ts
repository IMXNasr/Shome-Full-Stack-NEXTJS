import User from "@/models/User";
import { sha1 } from "@/utils/functions";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
	try {
		const body = await request.json();
		const user = {
			name: body.name,
			username: body.username,
			email: body.email,
			password: sha1(body.password),
			admin: false,
		};
		const checkUsername = await User.findOne({ username: user.username });
		const checkEmail = await User.findOne({ email: user.email });
		if (checkUsername) return NextResponse.json({ error: "There's a user with the same username !!" });
		if (checkEmail) return NextResponse.json({ error: "There's a user with the same email !!" });
		await User.create(user);
		return NextResponse.json({ success: "User created successfully !!" });
	} catch (error) {
		console.log("REGISTER API", error);
		return NextResponse.json({ error });
	}
};
