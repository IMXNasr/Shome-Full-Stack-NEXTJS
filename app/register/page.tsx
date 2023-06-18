import RegisterContent from "./content";
import { Navbar } from "@/components";
import { getTitle } from "@/utils/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

export const metadata = {
	title: getTitle("Register"),
};

const Register = async () => {
	const session = await getServerSession(authOptions);
	if (session) {
		return redirect("/");
	}
	return (
		<>
			<Navbar />
			<RegisterContent />
		</>
	);
};

export default Register;
