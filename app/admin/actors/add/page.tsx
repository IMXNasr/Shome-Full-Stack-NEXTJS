import { getTitle } from "@/utils/functions";
import AddActorContent from "./content";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
	title: getTitle("Admin Add Actor"),
};

const AddActorPage = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/login?redirect=/admin/actors/add");
	} else if (!session.user.admin) {
		return redirect("/");
	}
	const countries = await (await fetch("https://restcountries.com/v3.1/all")).json();
	return <AddActorContent countries={countries} />;
};

export default AddActorPage;
