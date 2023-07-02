// import { NextApiRequest, NextApiResponse } from "next";
// import Show from "@/models/Show";
// import { move } from "fs-extra";
// import connect from "@/utils/connect";
// import { staticURL } from "@/utils/constants";

// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

// const addShow = async (req: NextApiRequest, res: NextApiResponse) => {
// 	try {
// 		await connect();
// 		const form = formidable({ multiples: true });
// 		form.parse(req, async (err: any, fields: any, files: any) => {
// 			const newImageName = Date.now() + "_" + files.image.originalFilename;
// 			const newCoverName = files.cover && Date.now() + "_" + files.cover.originalFilename;
// 			move(files.image.filepath, "./public" + staticURL + "/show/" + newImageName);
// 			if (files.cover) {
// 				move(files.cover.filepath, "./public" + staticURL + "/cover/" + newCoverName);
// 			}
// 			const newShow = {
// 				name: fields.name,
// 				type: fields.type,
// 				genres: fields.genres.split(","),
// 				description: fields.description,
// 				released_date: fields.released_date === "undefined" ? undefined : fields.released_date,
// 				rating: Number(fields.rating),
// 				num_episodes: Number(fields.num_episodes),
// 				runtime: Number(fields.runtime),
// 				trailer_link: fields.trailer_link,
// 				country: fields.country,
// 				image: newImageName,
// 				cover: newCoverName,
// 				featured: fields.featured === "true" ? true : false,
// 			};
// 			await Show.create(newShow);
// 			return res.json({ success: "Added successfully !!" });
// 		});
// 	} catch (err) {
// 		console.log("ADD SHOW API", err);
// 		return res.status(404).json({ error: err });
// 	}
// };

// export default addShow;

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
			image: await saveFile(image, "show"),
			cover: cover ? await saveFile(cover, "cover") : null,
			featured: data.get("featured") === "true" ? true : false,
		};
    
		await Show.create(newShow);
		return NextResponse.json("Show added successfully !!", { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 400 });
	}
};
