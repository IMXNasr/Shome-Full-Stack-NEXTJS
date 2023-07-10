import { notFound } from "next/navigation";
import ShowsContent from "./content";
import { getTitle } from "@/utils/functions";

export const generateMetadata = ({ params: { type } }: { params: { type: string } }) => {
	return {
		title: type === "all" ? getTitle("All Shows") : type === "tv" ? getTitle("All TV Series") : getTitle("All " + type[0].toUpperCase() + type.substring(1) + "s"),
	};
};

const ShowsPage = async ({ params: { type }, searchParams: { search } }: any) => {
	const showsByScroll = 8;
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows?type=${type}&search=${search || ""}&skip=${0}&limit=${showsByScroll}`, { cache: "no-store" });
	const data = await res.json();
	if (res.status !== 200) notFound();
	return <ShowsContent data={data} showsByScroll={showsByScroll} />;
};

export default ShowsPage;
