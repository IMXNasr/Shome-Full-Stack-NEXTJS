import { getServerSession } from "next-auth";
import EditActorContent from "./content";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";
import { getTitle } from "@/utils/functions";

const getActor = async (id: string) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors/${id}`, { cache: "no-store" });
	const data = await res.json();
	return { status: res.status, data };
};

export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
	const { status, data } = await getActor(id);
	if (status === 200) return { title: getTitle("Edit: " + data.name) };
};

const EditActorPage = async ({ params: { id } }: { params: { id: string } }) => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/login?redirect=/admin/actors/" + id);
	} else if (!session.user.admin) {
		return redirect("/");
	}
	const { status, data } = await getActor(id);
	if (status !== 200) notFound();
	const countries = await (await fetch("https://restcountries.com/v3.1/all")).json();
	return <EditActorContent actor={data} countries={countries} />;
};

export default EditActorPage;
