import { appName } from "@/utils/constants";
import Content from "./content";
import { Navbar } from "@/components";

export const metadata = {
	title: appName,
};

const Home = async () => {
	const shows = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows/featured`, { cache: "no-store" })).json();
	return (
		<>
			<Navbar />
			<Content shows={shows} />;
		</>
	);
};

export default Home;
