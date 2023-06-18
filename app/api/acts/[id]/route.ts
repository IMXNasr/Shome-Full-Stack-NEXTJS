import Act from "@/models/Act";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params: { id } }: { params: { id: string } }) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const forWhat = searchParams.get("for");
		let allActs;
		// Get acting for show
		if (forWhat === "show") {
      allActs = await Act.find({ show: id });
    // Get acting for actor
		} else if (forWhat === "actor") {
			allActs = await Act.find({ actor: id });
		}
    return NextResponse.json(allActs);
	} catch (error) {
		return NextResponse.json({ error });
	}
};
