"use client";

import { ShowCard } from "@/components";
import { useParams } from "next/navigation";

const ShowsContent = ({ shows }: any) => {
	const type: any = useParams().type;
	return (
		<>
			<main className="container py-4 mt-6">
				<h1 className="text-4xl font-semibold">All {type === "all" ? "Shows" : type === "tv" ? "TV Series" : type[0].toUpperCase() + type.substring(1) + "s"}</h1>
				{/* Grid Shows */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-6">{shows && shows.length > 0 && shows.map((show: any, idx: number) => <ShowCard key={idx} {...show} />)}</div>
				{/* {shows.length <= 0 && !loading && <Warning>Can't find shows</Warning>} */}
			</main>
		</>
	);
};

export default ShowsContent;
