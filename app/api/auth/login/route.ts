import User from "@/models/User";
import connect from "@/utils/connect";
import { sha1 } from "@/utils/functions";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
	try {
		await connect();
		const body = await request.json();
		const user = {
			email: body.email,
			password: sha1(body.password),
		};
		const checkEmail = await User.findOne({ email: user.email });
		if (!checkEmail) {
			return NextResponse.json({ error: "There's no user with this email !!" });
		}
		if (checkEmail.password !== user.password) {
			return NextResponse.json({ error: "Password is wrong !!" });
		}
		const userInfo = { _id: checkEmail.id, name: checkEmail.name, username: checkEmail.username, email: checkEmail.email, admin: checkEmail.admin, date_joined: checkEmail.date_joined };
		return NextResponse.json({ success: "Logged in !!", user: userInfo });
	} catch (error) {
		return NextResponse.json({ error });
	}
};
