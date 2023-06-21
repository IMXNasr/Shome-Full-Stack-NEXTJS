import Show from "@/models/Show";
import connect from "@/utils/connect";
import { navLinks } from "@/utils/constants";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const type = searchParams.get("type");
		const search = searchParams.get("search");
		let allShows;
		if (type === "all") {
      allShows = await Show.find({ name: { $regex: search ?? "", $options: "i" } }).sort({ date_added: -1 });
		} else if ([...navLinks.map((link) => link.link)].includes("/" + type)) {
			allShows = await Show.find({ name: { $regex: search ?? "", $options: "i" }, type: type }).sort({ date_added: -1 });
		} else {
			return NextResponse.json({ error: "Not Found !!" });
		}
		return NextResponse.json(allShows);
	} catch (error) {
		return NextResponse.json({ error });
	}
};
