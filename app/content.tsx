"use client";

import { ShowCard, Slider, WatchTrailer } from "@/components";
import { appName } from "@/utils/constants";
import { useState } from "react";

const Content = ({ shows }: any) => {
	const [watchTrailer, setWatchTrailer] = useState<boolean>(false);
	const [activeSlider, setActiveSlider] = useState<number>(0);
	return (
		<main className="container py-4 mt-6">
			{shows.length > 0 && <Slider shows={shows} activeSlider={activeSlider} setActiveSlider={setActiveSlider} setWatchTrailer={setWatchTrailer} />}
			<h1 className="text-4xl font-semibold mt-6">Popular on {appName}</h1>
			{/* Grid Shows */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-6">{shows.map((show: any, idx: number) => <ShowCard key={idx} {...show} />).slice(0, 8)}</div>
			{watchTrailer && <WatchTrailer url={shows[activeSlider].trailer_link} setWatchTrailer={setWatchTrailer} />}
		</main>
	);
};

export default Content;
