import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const Navbar = async () => {
	const session = await getServerSession(authOptions);
	return (
		<>
			<h1>Hi</h1>
			{/* <NavbarContent user={session && session.user} /> */}
		</>
	);
};

export default Navbar;
