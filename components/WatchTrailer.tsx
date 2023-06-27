"use client";

import React, { useState } from "react";
import YouTubePlayer from "react-player/youtube";
import Spinner from "./Spinner";

interface Props {
	setWatchTrailer: any;
	url: string;
}

const WatchTrailer = ({ setWatchTrailer, url }: Props) => {
	const [loading, setLoading] = useState(true);
	return (
		// Overlay
		<div className="fixed w-full h-full bg-bgDark/90 top-0 left-0 flex flex-col justify-center" onClick={() => setWatchTrailer(false)}>
			{loading && <Spinner />}
			{/* Player */}
			<div className="max-w-6xl aspect-video relative left-1/2 -translate-x-1/2">
				<YouTubePlayer width="100%" height="100%" url={url} controls onReady={() => setLoading(false)} />
			</div>
		</div>
	);
};

export default WatchTrailer;
