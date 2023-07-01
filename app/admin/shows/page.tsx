import { getDate, getTitle } from "@/utils/functions";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Link from "next/link";
import { staticURL } from "@/utils/constants";

export const metadata = {
	title: getTitle("Admin Shows"),
};

const AdminShowsPage = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows?type=all`);
	const data = await res.json();
	return (
		<main className="container my-5">
			<h1 className="text-4xl font-semibold my-5">Shows:</h1>
			<>
				<div className="w-full overflow-auto">
					<table className="table-auto w-full border">
						<thead>
							<tr>
								<td className="p-3 text-center">Name</td>
								<td className="p-3 text-center">Type</td>
								{/* <td className="p-3 text-center">Genres</td> */}
								<td className="p-3 text-center">Rating</td>
								<td className="p-3 text-center">Trailer Link</td>
								<td className="p-3 text-center">Runtime</td>
								<td className="p-3 text-center">Episodes</td>
								<td className="p-3 text-center">Country</td>
								<td className="p-3 text-center">Image</td>
								<td className="p-3 text-center">Cover</td>
								<td className="p-3 text-center">Released Date</td>
								<td className="p-3 text-center">Date Added</td>
								<td className="p-3 text-center">Featured</td>
							</tr>
						</thead>
						<tbody>
							{data?.map((show: any, idx: number) => (
								<tr className="border-t" key={idx}>
									<td className="p-3 text-center">
										<Link className="underline text-mainColor" href={"/admin/shows/" + show._id}>
											{show.name}
										</Link>
									</td>
									<td className="p-3 text-center">{show.type === "tv" ? "TV Series" : show.type[0].toUpperCase() + show.type.substring(1)}</td>
									{/* <td className="p-3 text-center">{show.genres}</td> */}
									<td className="p-3 text-center">{show.rating.toFixed(1)}</td>
									<td className="p-3 text-center">
										<a className="underline text-mainColor" href={show.trailer_link} target="_blank">
											Link
										</a>
									</td>
									<td className="p-3 text-center">
										{+show.runtime <= 0 ? "---" : show.runtime}
										{show.runtime > 0 && <small>m</small>}
									</td>
									<td className="p-3 text-center">{+show.num_episodes === 0 ? "---" : show.num_episodes}</td>
									<td className="p-3 text-center">{show.country}</td>
									<td className="p-3 text-center">
										<img className="h-10 mx-auto" src={staticURL + "/show/" + show.image} alt={show.name} />
									</td>
									<td className="p-3 text-center">
										<img className="h-10 mx-auto" src={staticURL + "/cover/" + show.cover} alt={show.name} />
									</td>
									<td className="p-3 text-center">{getDate(show.released_date)}</td>
									<td className="p-3 text-center">{getDate(show.date_added)}</td>
									<td className="p-3 text-center">{show.featured ? <FaCheckCircle className="mx-auto text-green-500" /> : <FaTimesCircle className="mx-auto text-red-500" />}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<Link href="/admin/shows/add">
					<button className="bg-mainColor py-3 px-4 mt-6">Add Show</button>
				</Link>
			</>
		</main>
	);
};

export default AdminShowsPage;

// export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
// 	const session = await getSession({ req });
// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: "/login?redirect=admin/shows",
// 				permanent: false,
// 			},
// 		};
// 	}
// 	if (!session.user.admin) {
// 		return {
// 			redirect: {
// 				destination: "/",
// 				permanent: false,
// 			},
// 		};
// 	}
// 	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shows?type=all`);
// 	return {
// 		props: {
// 			shows: data,
// 		},
// 	};
// };
