// import User from "@/models/User";
// import connect from "@/utils/connect";
// import { sha1 } from "@/utils/functions";
// import { NextApiRequest, NextApiResponse } from "next";

import User from "@/models/User";
import connect from "@/utils/connect";
import { sha1 } from "@/utils/functions";
import { NextResponse } from "next/server";

// const register = async (req: NextApiRequest, res: NextApiResponse) => {
// 	try {
// 		await connect();
// 		const user = {
// 			name: req.body.name,
// 			username: req.body.username,
// 			email: req.body.email,
// 			password: sha1(req.body.password),
// 			admin: false,
// 		};
// 		const checkUsername = await User.findOne({ username: user.username });
// 		const checkEmail = await User.findOne({ email: user.email });
// 		if (checkUsername) return res.json({ error: "There's a User with the same username" });
// 		if (checkEmail) return res.json({ error: "There's a User with the same email" });
// 		await User.create(user);
// 		return res.json({ success: "User created successfully !!" });
// 	} catch (err) {
// 		console.log("REGISTER API", err);
// 	}
// };

// export default register;

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
			admin: false,
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
