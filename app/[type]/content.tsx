"use client";

import { ShowCard } from "@/components";
import { SkeletonShowCard } from "@/components";
import { useParams } from "next/navigation";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Loader = () => (
	<>
		<SkeletonShowCard />
		<SkeletonShowCard />
		<SkeletonShowCard />
		<SkeletonShowCard />
	</>
);

const ShowsContent = ({ data, showsByScroll }: { data: any; showsByScroll: number }) => {
	const type: string = useParams().type;
	const search: string = useParams().search;
	const [shows, setShows] = useState(data);
	const [hasMore, setHasMore] = useState(true);
	const [skip, setSkip] = useState(showsByScroll);
	const getMoreShows = async () => {
		const newShows = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows?type=${type}&search=${search || ""}&skip=${skip}&limit=${showsByScroll}`)).json();
		if (newShows.length <= 0) {
			setHasMore(false);
		} else {
			setShows((prev: any) => [...prev, ...newShows]);
			setSkip((prev: any) => prev + showsByScroll);
		}
	};
	return (
		<>
			<main className="container py-4 mt-6">
				<h1 className="text-4xl font-semibold">All {type === "all" ? "Shows" : type === "tv" ? "TV Series" : type[0].toUpperCase() + type.substring(1) + "s"}</h1>
				{/* Grid Shows */}
				<InfiniteScroll loader={<Loader />} next={getMoreShows} dataLength={shows.length} hasMore={hasMore} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-6">
					{shows.map((show: any, idx: number) => (
						<ShowCard key={idx} {...show} />
					))}
				</InfiniteScroll>
				{/* {shows.length <= 0 && !loading && <Warning>Can't find shows</Warning>} */}
			</main>
		</>
	);
};

export default ShowsContent;
