import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import EditShowContent from "./content";
import { getTitle } from "@/utils/functions";

const getShow = async (id: string) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows/${id}`, { cache: "no-store" });
	const data = await res.json();
	return { status: res.status, data };
};

export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
	const { status, data } = await getShow(id);
	if (status === 200)
		return {
			title: getTitle("Edit: " + data.name),
		};
};

const EditShowPage = async ({ params: { id } }: { params: { id: string } }) => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/login?redirect=/admin/shows/" + id);
	} else if (!session.user.admin) {
		return redirect("/");
	}
	const { status, data } = await getShow(id);
	if (status !== 200) notFound();
	const countries = await (await fetch("https://restcountries.com/v3.1/all")).json();
	return <EditShowContent id={id} show={data} countries={countries} />;
};

export default EditShowPage;
