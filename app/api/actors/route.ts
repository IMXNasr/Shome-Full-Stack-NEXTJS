import Actor from "@/models/Actor";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
	try {
		await connect();
		const allActors = await Actor.find().sort({ date_added: -1 });
		return NextResponse.json(allActors, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
