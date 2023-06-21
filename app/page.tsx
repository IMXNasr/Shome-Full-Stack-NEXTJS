import { appName } from "@/utils/constants";
import Content from "./content";
import { Navbar } from "@/components";

export const metadata = {
	title: appName,
};

const Home = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows/featured`);
	const shows = await res.json();
	return (
		<>
			<Navbar />
			<Content shows={shows} />
		</>
	);
};

export default Home;
