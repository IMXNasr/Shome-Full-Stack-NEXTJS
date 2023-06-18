import LoginContent from "./content";
import { getTitle } from "@/utils/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components";

export const metadata = {
	title: getTitle("Login"),
};

const Login = async () => {
	const session = await getServerSession(authOptions);
	if (session) {
		return redirect("/");
	}
	return (
		<>
			<Navbar />
			<LoginContent />
		</>
	);
};

export default Login;
