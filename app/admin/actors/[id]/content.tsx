"use client";

import { Spinner } from "@/components";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const EditActorContent = ({ countries, actor }: any) => {
	const [name, setName] = useState(actor.name);
	const [gender, setGender] = useState(actor.gender);
	const [biography, setBiography] = useState(actor.biography);
	const [birthday, setBirthday] = useState(actor.birthday);
	const [placeOfBirth, setPlaceOfBirth] = useState(actor.place_of_birth);
	const [photo, setPhoto] = useState<File>();
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [loading, setLoading] = useState(false);
	const id: string = useParams().id;
	const router = useRouter();
	const submitFn = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append("name", name);
		formData.append("gender", gender);
		formData.append("biography", biography);
		formData.append("birthday", birthday);
		formData.append("place_of_birth", placeOfBirth);
		if (photo) formData.append("photo", photo as Blob);
		console.log(formData);
		const config = {
			method: "PUT",
			body: formData,
		};
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors/edit?id=${id}`, config);
		setLoading(false);
	};
	const deleteFn = async () => {
		setLoading(true);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors/delete?id=${id}`, { method: "DELETE" });
		if (res.status === 200) {
			router.replace("/admin/actors");
		}
		setLoading(false);
	};
	return (
		<div className="container mx-auto m-14 grid place-items-center">
			<form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn} encType="multipart/form-data">
				{/* {success && <Message type="success">{success}</Message>} */}
				<h1 className="text-4xl font-semibold">Add New Actor</h1>
				<label className="text-xl -mb-3">Name:</label>
				<input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
				<label className="text-xl -mb-3">Gender:</label>
				<select className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>
				<label className="text-xl -mb-3">Biography:</label>
				<textarea className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl h-32" name="bio" placeholder="Biography" value={biography} onChange={(e) => setBiography(e.target.value)}></textarea>
				<label className="text-xl -mb-3">Birthday:</label>
				<input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" type="date" name="birthday" placeholder="Birthday" value={new Date(birthday).toISOString().substring(0, 10)} onChange={(e) => setBirthday(e.target.value)} />
				<label className="text-xl -mb-3">Place of Birth:</label>
				<input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="place_of_birth" placeholder="Place of Birth" list="place_of_birth" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} />
				<datalist id="place_of_birth">
					{countries.map((country: any, idx: number) => (
						<option key={idx} value={country.name.common}>
							{country.name.common}
						</option>
					))}
				</datalist>
				<label className="text-xl -mb-3">Photo:</label>
				<input className="file:bg-mainColor file:border-none file:text-white file:rounded-full file:py-2 file:px-4 cursor-pointer focus:outline-none" type="file" name="photo" onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : undefined)} />
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

export default EditActorContent;
