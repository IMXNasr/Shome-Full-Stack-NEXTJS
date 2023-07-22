import Show from "@/models/Show";
import connect from "@/utils/connect";
import { navLinks } from "@/utils/constants";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const type = searchParams.get("type");
		const search = searchParams.get("search");
		const skip = Number(searchParams.get("skip"));
		const limit = Number(searchParams.get("limit"));
		let allShows;
		if (type === "all") {
			allShows = await Show.find({ name: { $regex: search ?? "", $options: "i" } })
				.sort({ date_added: -1 })
				.skip(skip || 0)
				.limit(limit || 0);
		} else if ([...navLinks.map((link) => link.link)].includes("/" + type)) {
			allShows = await Show.find({ name: { $regex: search ?? "", $options: "i" }, type })
				.sort({ date_added: -1 })
				.skip(skip || 0)
				.limit(limit || 0);
		} else {
			return NextResponse.json("Not Found !!", { status: 404 });
		}
		return NextResponse.json(allShows, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 404 });
	}
};
