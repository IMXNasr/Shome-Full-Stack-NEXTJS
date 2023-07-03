import HomeContent from "./content";

const HomePage = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows/featured`, { cache: "no-store" });
	const data = await res.json();
	return <>{res.status !== 200 ? <h1>{data}</h1> : <HomeContent shows={data} />}</>;
};

export default HomePage;
