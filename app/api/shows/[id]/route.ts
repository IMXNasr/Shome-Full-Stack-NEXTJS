import Show from "@/models/Show";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

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
			return NextResponse.json({ success: "Fetched Successfully !!", show: oneShow });
		} else {
			return NextResponse.json({ error: "Can't find this show !!" });
		}
	} catch (error) {
		return NextResponse.json({ error });
	}
};
