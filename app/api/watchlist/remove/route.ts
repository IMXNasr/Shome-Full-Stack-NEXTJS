import User from "@/models/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const showId = searchParams.get("showId");
		const user = await User.findOne({ _id: id });
		const newWishlist = user.wishlist.filter((item: string) => item !== showId);
		await User.findByIdAndUpdate(id, { wishlist: newWishlist });
		return NextResponse.json("Show removed from wishlist successfully !!", { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
