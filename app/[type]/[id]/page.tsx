import { Navbar } from "@/components";
import OneShowContent from "./content";
import { getTitle } from "@/utils/functions";
import { notFound } from "next/navigation";

const getShow = async (id: string, type?: string) => {
	const show = JSON.parse(await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows/${id}?type=${type ?? ""}`)).text());
	return show;
};

const getActors = async (id: string) => {
	const actors = JSON.parse(await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acts/${id}?for=show`)).text());
	return actors;
};

export const generateMetadata = async ({ params: { id, type } }: { params: { id: string; type: string } }) => {
	const data = await getShow(id, type);
	if (data.success)
		return {
			title: getTitle(data.show.name),
		};
};

const OneShowPage = async ({ params: { id, type } }: { params: { id: string; type: string } }) => {
	const data = await getShow(id, type);
	const actors = await getActors(id);
	if (data.error) notFound();
	return (
		<>
			<Navbar />
			<OneShowContent show={data.show} actors={actors} />
		</>
	);
};

export default OneShowPage;
