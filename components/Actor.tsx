"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { staticURL } from "../utils/constants";

interface actorProps {
	_id: string;
	name: string;
	gender: string;
	biography: string;
	birthday: string | Date;
	place_of_birth: string;
	photo: string;
	date_added: string | Date;
	__v?: any;
}

const Actor = ({ id, as }: { id: string; as: string }) => {
	const [actor, setActor] = useState<actorProps>({ _id: "", name: "", gender: "", biography: "", birthday: "", place_of_birth: "", photo: "", date_added: "" });
	const getActor = async () => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors/${id}`);
		const data = await res.json();
		if (res.status === 200) {
			setActor(data);
		}
	};
	useEffect(() => {
		getActor();
	}, []);
	return (
		<div className="flex gap-4 mb-5">
			{/* Actor Image */}
			<div>
				<div className="w-16 aspect-square rounded-full overflow-hidden">
					<Link href={`/actor/${id}`}>
						<img className="pointer-events-none" src={`${staticURL}/actor/${actor.photo}`} alt={actor.name} />
					</Link>
				</div>
			</div>
			<div className="flex flex-col">
				<h2 className="text-2xl font-semibold">
					<Link href={`/actor/${id}`}>{actor.name}</Link>
				</h2>
				{actor.name && <h4 className="text-sm">as {as}</h4>}
			</div>
		</div>
	);
};

export default Actor;
