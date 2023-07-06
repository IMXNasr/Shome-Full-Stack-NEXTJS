import Actor from "@/models/Actor";
import connect from "@/utils/connect";
import { saveFile } from "@/utils/functions";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
	try {
		await connect();
		const data = await request.formData();

		const photo: File | null = data.get("photo") as unknown as File;

		const newActor = {
			name: data.get("name"),
			gender: data.get("gender"),
			biography: data.get("biography"),
			birthday: data.get("birthday"),
			place_of_birth: data.get("place_of_birth"),
			photo: await saveFile(photo, "actor"),
		};
		await Actor.create(newActor);
		return NextResponse.json("Actor added successfully !!", { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
