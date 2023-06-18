import Actor from "@/models/Actor";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params: { id } }: { params: { id: string } }) => {
	try {
		await connect();
		const oneActor = await Actor.findOne({ _id: id });
		return NextResponse.json(oneActor);
	} catch (error) {
		return NextResponse.json({ error: "Can't find this Actor !!" });
	}
};
