import { getDate, getTitle } from "@/utils/functions";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Link from "next/link";
import { staticURL } from "@/utils/constants";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
	title: getTitle("Admin Shows"),
};

const AdminShowsPage = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/login?redirect=/admin/shows");
	} else if (!session.user.admin) {
		return redirect("/");
	}
	const data: any = [{
    "_id": "642ce47cae6c910e5b9b744d",
    "name": "Avatar: The Way of Water",
    "type": "movie",
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "description": "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    "released_date": "2022-12-16T00:00:00.000Z",
    "rating": 7.8,
    "num_episodes": 0,
    "runtime": 192,
    "trailer_link": "https://www.youtube.com/watch?v=d9MyW72ELq0",
    "country": "United States",
    "image": "1680663676779_avatar.jpg",
    "cover": "1680663676779_avatarcover.jpg",
    "featured": true,
    "date_added": "2023-04-05T03:01:16.782Z",
    "__v": 0
  }];
	return (
		<main className="container my-5">
			<h1 className="text-4xl font-semibold my-5">Shows:</h1>
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
						{data &&
							data.map((show: any, idx: number) => (
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
		</main>
	);
};

export default AdminShowsPage;
