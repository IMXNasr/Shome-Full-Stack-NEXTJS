import { Show } from "@/components";
import { staticURL } from "@/utils/constants";
import { getAge, getDate, getTitle } from "@/utils/functions";

const getActor = async (id: string) => {
	const actor = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors/${id}`)).json();
	return actor;
};

const getShows = async (id: string) => {
	const shows = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acts/${id}?for=actor`)).json();
	return shows;
};

export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
  const actor = await getActor(id);
	return {
		title: getTitle(actor.name),
	};
};

const OneActor = async ({ params: { id } }: { params: { id: string } }) => {
	const actor = await getActor(id);
	const shows = await getShows(id);
	return (
		<>
			{/* Actor Name */}
			<div className="container mt-6">
				<h1 className="text-4xl font-semibold">{actor.name}</h1>
			</div>
			{/* Body */}
			<main className="container flex flex-col md:flex-row gap-6 my-6">
				{/* Left Side */}
				<div className="max-w-[300px] md:w-2/4 lg:w-1/4">
					{/* Photo Container */}
					<div className="overflow-hidden rounded-2xl mx-auto bg-red">
						<img className="w-full rounded-2xl" src={staticURL + "/actor/" + actor.photo} alt={actor.name} />
					</div>
					<h2 className="text-xl font-medium my-4">Personal Info</h2>
					<h3 className="text-lg font-medium mt-4">Gender</h3>
					<p className="font-light">{actor.gender}</p>
					<h3 className="text-lg font-medium mt-4">Birthday</h3>
					<p className="font-light">{`${getDate(actor.birthday)} (${getAge(actor.birthday)} years old)`}</p>
					<h3 className="text-lg font-medium mt-4">Place of Birth</h3>
					<p className="font-light">{actor.place_of_birth}</p>
				</div>
				{/* Right Side */}
				<div className="md:w-2/4 lg:w-3/4">
					<h3 className="text-lg font-medium mb-5">Biography</h3>
					<p className="font-light">{actor.biography}</p>
					{shows.length > 0 && (
						<>
							<h3 className="text-lg font-medium my-5">Known For</h3>
							<div className="overflow-auto flex py-3">
								{/* Show Card */}
								<div className="flex gap-6">{shows.map((show: any, idx: number) => <Show key={idx} id={show.show} />).reverse()}</div>
							</div>
						</>
					)}
				</div>
			</main>
		</>
	);
};

export default OneActor;
