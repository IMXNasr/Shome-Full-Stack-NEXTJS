import Actor from "@/models/Actor";
import connect from "@/utils/connect";
import { staticURL } from "@/utils/constants";
import { saveFile } from "@/utils/functions";
import { unlinkSync } from "fs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PUT = async (request: Request) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const data = await request.formData();

		const photo: File | null = data.get("photo") as unknown as File;

		const newActor = {
			name: data.get("name"),
			gender: data.get("gender"),
			biography: data.get("biography"),
			birthday: data.get("birthday"),
			place_of_birth: data.get("place_of_birth"),
		};
		const actor = await Actor.findByIdAndUpdate(id, newActor);
		if (photo) {
			const newPhotoName = await saveFile(photo, "actor");
			if (actor.photo) {
				try {
					unlinkSync("./public" + staticURL + "/actor/" + actor.photo);
				} catch (error) {
					console.log(error);
				}
			}
			await Actor.findByIdAndUpdate(id, { photo: newPhotoName });
		}
		return NextResponse.json("Edited successfully !!", { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
