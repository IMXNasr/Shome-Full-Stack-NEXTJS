import Show from "@/models/Show";
import connect from "@/utils/connect";
import { staticURL } from "@/utils/constants";
import { saveFile } from "@/utils/functions";
import { unlinkSync } from "fs";
import { NextResponse } from "next/server";

export const dynamic = "force_dynamic";

export const PUT = async (request: Request) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
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
			featured: data.get("featured") === "true" ? true : false,
		};

		const show = await Show.findByIdAndUpdate(id, newShow);

		if (image) {
			const newImageName = await saveFile(image, "show");
			if (show.image) {
				try {
					unlinkSync("./public" + staticURL + "/show/" + show.image);
				} catch (error) {
					console.error(error);
				}
			}
			await Show.findByIdAndUpdate(id, { image: newImageName });
		}

		if (cover) {
			const newCoverName = await saveFile(cover, "cover");
			if (show.cover) {
				try {
					unlinkSync("./public" + staticURL + "/cover/" + show.cover);
				} catch (error) {
					console.error(error);
				}
			}
			await Show.findByIdAndUpdate(id, { cover: newCoverName });
		}

		return NextResponse.json("Edited successfully !!", { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
