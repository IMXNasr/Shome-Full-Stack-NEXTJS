import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import NavbarContent from "./NavbarContent";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <NavbarContent user={session && session.user} />
  )
}

export default Navbar;