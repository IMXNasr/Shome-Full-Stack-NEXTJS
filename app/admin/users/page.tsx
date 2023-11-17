import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { staticURL } from "@/utils/constants";
import { getDate, getTitle } from "@/utils/functions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BsImageFill } from "react-icons/bs";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const metadata = {
	title: getTitle("Admin Users"),
};

const UsersPage = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/login?redirect=/admin/users");
	} else if (!session.user.admin) {
		return redirect("/");
	}
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { cache: "no-store" });
	const data = await res.json();
	return (
		<main className="container">
			<h1 className="text-4xl font-semibold my-5">Users:</h1>
			<>
				<div className="w-full overflow-auto">
					<table className="table-auto w-full border">
						<thead>
							<tr>
								<td className="p-3 text-center">Username</td>
								<td className="p-3 text-center">Name</td>
								<td className="p-3 text-center">Email</td>
								<td className="p-3 text-center">Date Joined</td>
								<td className="p-3 text-center">Admin</td>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((user: any, idx: number) => (
									<tr className="border-t" key={idx}>
										<td className="p-3 text-center">
											<Link className="underline text-mainColor" href={"/admin/users/" + user._id}>
												{user.username}
											</Link>
										</td>
										<td className="p-3 text-center">{user.name}</td>
										<td className="p-3 text-center">{user.email}</td>
										<td className="p-3 text-center">{getDate(user.date_joined)}</td>
										<td className="p-3 text-center">{user.admin ? <FaCheckCircle className="mx-auto text-green-500" /> : <FaTimesCircle className="mx-auto text-red-500" />}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<Link href="/admin/users/add">
					<button className="bg-mainColor py-3 px-4 mt-6">Add User</button>
				</Link>
			</>
		</main>
	);
};

export default UsersPage;
