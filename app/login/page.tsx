import LoginContent from "./content";
import { getTitle } from "@/utils/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
			<LoginContent />
		</>
	);
};

export default Login;
