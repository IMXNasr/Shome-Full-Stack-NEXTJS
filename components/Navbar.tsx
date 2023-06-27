import authOptions from "@/utils/auth";
import { getServerSession } from "next-auth";
import NavbarContent from "./NavbarContent";

const Navbar = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
	return (
		<>
			<h1>Hi</h1>
			<NavbarContent user={session && session.user} />
		</>
	);
};

export default Navbar;
