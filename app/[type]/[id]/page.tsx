import OneShowContent from "./content";
import { getTitle } from "@/utils/functions";
import { notFound } from "next/navigation";

const getShow = async (id: string, type?: string) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows/${id}?type=${type || ""}`);
	const data = await res.json();
	return { status: res.status, data };
};

// const getActors = async (id: string) => {
// 	const actors = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acts/${id}?for=show`)).json();
// 	return actors;
// };

export const generateMetadata = async ({ params: { id, type } }: { params: { id: string; type: string } }) => {
	const { status, data } = await getShow(id, type);
	if (status === 200)
		return {
			title: getTitle(data.name),
		};
};

const OneShowPage = async ({ params: { id, type } }: { params: { id: string; type: string } }) => {
	const { status, data } = await getShow(id, type);
	if (status !== 200) notFound();
	return (
		<>
			<OneShowContent show={data} actors={[]} />
		</>
	);
};

export default OneShowPage;
