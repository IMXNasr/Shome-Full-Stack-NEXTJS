import Act from "@/models/Act";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
	try {
		await connect();
		const body = await request.json();
		const newAct = {
			actor: body.actor,
			show: body.show,
			act_as: body.as,
		};
		const existAct = await Act.findOne({ actor: newAct.actor, show: newAct.show });
		if (!existAct) {
			await Act.create(newAct);
			return NextResponse.json("Added successfully !!", { status: 200 });
		} else {
			return NextResponse.json("Already Exists !!", { status: 406 });
		}
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
