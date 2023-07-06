"use client";

import { FormEvent, useState } from "react";
import { Spinner } from "@/components";

const AddActingContent = ({ actors, shows }: any) => {
	const [actor, setActor] = useState("");
	const [show, setShow] = useState("");
	const [as, setAs] = useState("");
	const [loading, setLoading] = useState(false);
	const submitFn = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		if (actor && show && as) {
			// await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/acts/add`, { actor, show, as });
			const config = {
				method: "POST",
				body: JSON.stringify({ actor, show, as }),
			};
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acts/add`, config);
		}
		setLoading(false);
	};
	return (
		<div className="container mx-auto m-14 grid place-items-center">
			<form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn} encType="multipart/form-data">
				{/* {success ? <Message type="success">{success}</Message> : error ? <Message type="error">{error}</Message> : null} */}
				<h1 className="text-4xl font-semibold">Add Acting</h1>
				<label className="text-xl -mb-3">Actor:</label>
				<select className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" name="actor" onChange={(e) => setActor(e.target.value)}>
					<option disabled selected>
						-- Select an Actor --
					</option>
					{actors.map((actor: any, idx: number) => (
						<option key={idx} value={actor._id}>
							{actor.name}
						</option>
					))}
				</select>
				<label className="text-xl -mb-3">Show:</label>
				<select className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" name="show" onChange={(e) => setShow(e.target.value)}>
					<option disabled selected>
						-- Select a Show --
					</option>
					{shows.map((show: any, idx: number) => (
						<option key={idx} value={show._id}>
							{show.name}
						</option>
					))}
				</select>
				<label className="text-xl -mb-3">As:</label>
				<input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="as" placeholder="As" onChange={(e) => setAs(e.target.value)} />
				<button className="bg-mainColor w-full text-white py-3 cursor-pointer rounded-xl" type="submit" name="submit">
					{loading ? <Spinner size={24} /> : "Add"}
				</button>
			</form>
		</div>
	);
};

export default AddActingContent;
