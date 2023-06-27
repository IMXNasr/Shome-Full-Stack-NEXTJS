"use client";

// import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { staticURL } from "../utils/constants";

const Show = ({ id }: { id: string }) => {
	const [show, setShow] = useState({ type: "", _id: "", image: "", name: "" });
	const getShow = async () => {
		// const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shows/${id}`);
		// if (data.success) {
		// 	setShow(data.show);
		// }
	};
	useEffect(() => {
		getShow();
	}, []);
	if(show.type)
	return (
		<div className="flex flex-col items-center justify-between gap-2 w-36">
			<Link href={`/${show.type}/${show._id}`}>
				<img className="rounded-lg" src={staticURL + "/show/" + show.image} alt={show.name} />
			</Link>
			<Link href={`/${show.type}/${show._id}`} className="hover:text-mainColor transition-colors">
				<h5 className="text-md font-light text-center">{show.name}</h5>
			</Link>
		</div>
	);
	else return null
};

export default Show;
