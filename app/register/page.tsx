import { getTitle } from "@/utils/functions";
import RegisterContent from "./content";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
	title: getTitle("Register"),
};

const Register = async () => {
	const session = await getServerSession(authOptions);
	if (session) {
		return redirect("/");
	}
	return <RegisterContent />;
};

export default Register;
