"use client";

import { Spinner } from "@/components";
import { showTypes, genres as genresData } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const EditShowContent = ({ id, show, countries }: any) => {
	const [name, setName] = useState(show.name);
	const [type, setType] = useState(show.type);
	const [genres, setGenres] = useState(show.genres);
	const [description, setDescription] = useState(show.description);
	const [releasedDate, setReleasedDate] = useState(show.released_date);
	const [rating, setRating] = useState(show.rating);
	const [numEpisodes, setNumEpisodes] = useState(show.num_episodes);
	const [runtime, setRuntime] = useState(show.runtime);
	const [trailerLink, setTrailerLink] = useState(show.trailer_link);
	const [country, setCountry] = useState(show.country);
	const [featured, setFeatured] = useState(show.featured);
	const [image, setImage] = useState<File>();
	const [cover, setCover] = useState<File>();
	const [loading, setLoading] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const router = useRouter();

	const submitFn = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append("name", name);
		formData.append("type", type);
		formData.append("genres", genres.toString());
		formData.append("description", description);
		formData.append("released_date", releasedDate);
		formData.append("rating", rating);
		formData.append("num_episodes", numEpisodes);
		formData.append("runtime", runtime);
		formData.append("trailer_link", trailerLink);
		formData.append("country", country);
		formData.append("featured", new Boolean(featured).toString());
		if (image) formData.append("image", image as Blob);
		if (cover) formData.append("cover", cover as Blob);
		console.log(formData);
		const config = {
			method: "PUT",
			body: formData,
		};
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows/edit?id=${id}`, config);
		setLoading(false);
	};
	const deleteFn = async () => {
		setLoading(true);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows/delete?id=${id}`, { method: "DELETE" });
		if (res.status === 200) {
			router.replace("/admin/shows");
		}
		setLoading(false);
	};
	return (
		<div className="container mx-auto m-14 grid place-items-center">
			<form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn} encType="multipart/form-data">
				{/* {success && <div className="bg-transparent w-full p-3 text-green-600 border-green-600 border-2 rounded">{success}</div>} */}
				<h1 className="text-4xl font-semibold">Add New Show</h1>
				<label className="text-xl -mb-3">Name:</label>
				<input className="bg-transparent w-full p-3 border focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
				<label className="text-xl -mb-3">Type:</label>
				<select className="bg-transparent w-full p-3 border focus:outline-none focus:border-mainColor rounded-xl" name="type" value={type} onChange={(e) => setType(e.target.value)}>
					{showTypes.map((type: any, idx: number) => (
						<option key={idx} value={type.value}>
							{type.name}
						</option>
					))}
				</select>
				<label className="text-xl -mb-3">Genres:</label>
				<select className="bg-transparent w-full p-3 border focus:outline-none focus:border-mainColor rounded-xl resize-y" name="genres" multiple value={genres} onChange={(e: any) => setGenres([...[...e.target.selectedOptions].map((genre) => genre.value)])}>
					{genresData.map((genre: any, idx: number) => (
						<option key={idx} value={genre.value}>
							{genre.label}
						</option>
					))}
				</select>
				<label className="text-xl -mb-3">Description:</label>
				<textarea className="bg-transparent w-full p-3 border focus:outline-none focus:border-mainColor rounded-xl h-32" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
				<label className="text-xl -mb-3">Released Date:</label>
				<input className="bg-transparent w-full p-3 border focus:outline-none focus:border-mainColor rounded-xl" type="date" name="released_date" placeholder="Released Date" value={new Date(releasedDate).toISOString().substring(0, 10)} onChange={(e) => setReleasedDate(e.target.value)} />
				<label className="text-xl -mb-3">Rating:</label>
				<input className="bg-transparent w-full p-3 border focus:outline-none focus:border-mainColor rounded-xl" type="number" name="rating" placeholder="Rating" min={0} max={10} step={0.1} value={rating} onChange={(e: ChangeEvent<HTMLInputElement>) => setRating(e.target.value)} />
				<label className="text-xl -mb-3">Num Episodes:</label>
				<input className="bg-transparent w-full p-3 border focus:outline-none focus:border-mainColor rounded-xl" type="number" name="num_episodes" placeholder="Num Episodes" min={0} step={1} value={numEpisodes} onChange={(e: ChangeEvent<HTMLInputElement>) => setNumEpisodes(e.target.value)} />
				<label className="text-xl -mb-3">Runtime (min):</label>
				<input className="bg-transparent w-full p-3 border focus:outline-none focus:border-mainColor rounded-xl" type="number" name="runtime" placeholder="Runtime" min={0} step={1} value={runtime} onChange={(e: ChangeEvent<HTMLInputElement>) => setRuntime(e.target.value)} />
				<label className="text-xl -mb-3">Trailer Link:</label>
				<input className="bg-transparent w-full p-3 border focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="trailer_link" placeholder="Trailer Link" value={trailerLink} onChange={(e: ChangeEvent<HTMLInputElement>) => setTrailerLink(e.target.value)} />
				<label className="text-xl -mb-3">Country:</label>
				<input className="bg-transparent w-full p-3 border focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="country" placeholder="Country" list="country" value={country} onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)} />
				<datalist id="country">
					{countries.map((country: any, idx: number) => (
						<option key={idx} value={country.name.common}>
							{country.name.common}
						</option>
					))}
				</datalist>
				<label className="text-xl -mb-3">Image:</label>
				<input className="file:bg-mainColor file:border-none file:text-white file:rounded-full file:py-2 file:px-4 cursor-pointer focus:outline-none" type="file" name="image" placeholder="Image" onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files ? e.target.files[0] : undefined)} />
				<label className="text-xl -mb-3">Cover:</label>
				<input className="file:bg-mainColor file:border-none file:text-white file:rounded-full file:py-2 file:px-4 cursor-pointer focus:outline-none" type="file" name="cover" placeholder="Cover" onChange={(e: ChangeEvent<HTMLInputElement>) => setCover(e.target.files ? e.target.files[0] : undefined)} />
				<div className="flex items-center gap-4">
					<input id="featured" className="border focus:outline-none focus:border-mainColor rounded-xl accent-mainColor" type="checkbox" name="featured" placeholder="Featured" checked={featured} onChange={() => setFeatured(!featured)} />
					<label htmlFor="featured" className="text-xl">
						Featured
					</label>
				</div>
				{/* Buttons */}
				{!deleteConfirmation ? (
					<div className="flex gap-5">
						<button className="bg-mainColor w-full text-white py-3 cursor-pointer rounded-xl border border-transparent" type="submit" name="save">
							{loading ? <Spinner size={24} /> : "Save"}
						</button>
						<button className="bg-red-700 w-full text-white py-3 cursor-pointer rounded-xl border border-transparent" type="button" name="delete" onClick={() => setDeleteConfirmation(true)}>
							Delete
						</button>
					</div>
				) : (
					<div className="flex gap-5">
						<button className="bg-red-700 w-full text-white py-3 cursor-pointer rounded-xl border border-transparent" type="button" name="submit" onClick={deleteFn}>
							{loading ? <Spinner size={24} /> : "Confirm Delete"}
						</button>
						<button className="bg-transparent w-full text-white py-3 cursor-pointer rounded-xl border" type="button" name="submit" onClick={() => setDeleteConfirmation(false)}>
							Cancel
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default EditShowContent;
