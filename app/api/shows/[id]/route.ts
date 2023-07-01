import Show from "@/models/Show";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request, { params: { id } }: { params: { id: string } }) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const type = searchParams.get("type");
		let oneShow;
		if (type) {
			oneShow = await Show.findOne({ _id: id, type: type });
		} else {
			oneShow = await Show.findOne({ _id: id });
		}
		if (oneShow) {
			return NextResponse.json(oneShow, { status: 200 });
		} else {
			return NextResponse.json("Can't find this show !!", { status: 404 });
		}
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
