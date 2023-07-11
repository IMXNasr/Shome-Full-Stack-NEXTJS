import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import { saveFile } from "@/utils/functions";
import Show from "@/models/Show";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
	try {
		await connect();
		const data = await request.formData();

		const image: File | null = data.get("image") as unknown as File;
		const cover: File | null = data.get("cover") as unknown as File;

		const newShow = {
			name: data.get("name"),
			type: data.get("type"),
			genres: (data.get("genres") as string)?.split(","),
			description: data.get("description"),
			released_date: data.get("released_date") === "undefined" ? undefined : data.get("released_date"),
			rating: Number(data.get("rating")),
			num_episodes: Number(data.get("num_episodes")),
			runtime: Number(data.get("runtime")),
			trailer_link: data.get("trailer_link"),
			country: data.get("country"),
			image: image ? await saveFile(image, "show") : null,
			cover: cover ? await saveFile(cover, "cover") : null,
			featured: data.get("featured") === "true" ? true : false,
		};
    
		await Show.create(newShow);
		return NextResponse.json("Show added successfully !!", { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
