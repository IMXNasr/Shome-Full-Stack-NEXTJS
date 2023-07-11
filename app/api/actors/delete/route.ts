import Actor from "@/models/Actor";
import connect from "@/utils/connect";
import { staticURL } from "@/utils/constants";
import { unlinkSync } from "fs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (request: Request) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const actor = await Actor.findByIdAndDelete(id);
		if (actor.photo) {
			try {
				unlinkSync("./public" + staticURL + "/actor/" + actor.photo);
			} catch (error) {
				console.log(error);
			}
		}
		return NextResponse.json("Deleted successfully !!", { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
