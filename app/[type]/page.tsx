import { notFound } from "next/navigation";
import ShowsContent from "./content";
import { getTitle } from "@/utils/functions";

export const generateMetadata = ({ params: { type } }: { params: { type: string } }) => {
	return {
		title: type === "all" ? getTitle("All Shows") : type === "tv" ? getTitle("All TV Series") : getTitle("All " + type[0].toUpperCase() + type.substring(1) + "s"),
	};
};

const ShowsPage = async ({ params: { type }, searchParams: { search } }: any) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows?type=${type}&search=${search || ""}`);
	const data = await res.json();
	return (
		<>
			{res.status !== 200 ? notFound() : <ShowsContent shows={data} />}
		</>
	);
};

export default ShowsPage;
