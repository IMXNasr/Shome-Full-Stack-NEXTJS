"use client";

import { ShowCard, Slider, WatchTrailer } from "@/components";
import { appName } from "@/utils/constants";
import { useState } from "react";

const Content = ({ shows }: any) => {
	console.log(shows);
	const [watchTrailer, setWatchTrailer] = useState<boolean>(false);
	const [activeSlider, setActiveSlider] = useState<number>(0);
	return (
		<main className="container py-4 mt-6">
			{shows.length > 0 && <Slider shows={shows} activeSlider={activeSlider} setActiveSlider={setActiveSlider} setWatchTrailer={setWatchTrailer} />}
		</main>
	);
};

export default Content;
