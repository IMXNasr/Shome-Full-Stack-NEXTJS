import { getTitle } from "@/utils/functions";
import ProfileContent from "./content";

export const metadata = {
	title: getTitle("Profile"),
};

const Profile = () => {
	return <ProfileContent />;
};

export default Profile;
