import Show from "@/models/Show";
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
		const show = await Show.findByIdAndDelete(id);
		if (show.image) {
			try {
				unlinkSync("./public" + staticURL + "/show/" + show.image);
			} catch (error) {
				console.error(error);
			}
		}
		if (show.cover) {
			try {
				unlinkSync("./public" + staticURL + "/cover/" + show.cover);
			} catch (error) {
				console.error(error);
			}
		}
		return NextResponse.json("Deleted successfully !!", { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
