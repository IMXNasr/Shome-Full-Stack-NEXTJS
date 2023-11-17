import { staticURL } from "@/utils/constants";
import { BsImageFill } from "react-icons/bs";
import Link from "next/link";
import { getDate, getTitle } from "@/utils/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
	title: getTitle("Admin Actors"),
};

const ShowsPage = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/login?redirect=/admin/actors");
	} else if (!session.user.admin) {
		return redirect("/");
	}
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors`, { cache: "no-store" });
	const data = await res.json();
	return (
		<main className="container">
			<h1 className="text-4xl font-semibold my-5">Actors:</h1>
			<>
				<div className="w-full overflow-auto">
					<table className="table-auto w-full border">
						<thead>
							<tr>
								<td className="p-3 text-center">
									<BsImageFill className="mx-auto" />
								</td>
								<td className="p-3 text-center">Name</td>
								<td className="p-3 text-center">Gender</td>
								<td className="p-3 text-center">Birthday</td>
								<td className="p-3 text-center">Place of Birth</td>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((actor: any, idx: number) => (
									<tr className="border-t" key={idx}>
										<td className="p-3 text-center">
											<div className="aspect-square h-10 overflow-hidden rounded-full mx-auto">
												<img className="w-10" src={staticURL + "/actor/" + actor.photo} alt={actor.name} />
											</div>
										</td>
										<td className="p-3 text-center">
											<Link className="underline text-mainColor" href={"/admin/actors/" + actor._id}>
												{actor.name}
											</Link>
										</td>
										<td className="p-3 text-center">{actor.gender}</td>
										<td className="p-3 text-center">{getDate(actor.birthday)}</td>
										<td className="p-3 text-center">{actor.place_of_birth}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<Link href="/admin/actors/add">
					<button className="bg-mainColor py-3 px-4 mt-6">Add Actor</button>
				</Link>
			</>
		</main>
	);
};

export default ShowsPage;
