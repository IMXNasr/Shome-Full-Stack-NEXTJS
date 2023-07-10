import { staticURL } from "@/utils/constants";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface Props {
	_id: string;
	name: string;
	type: string;
	image: string;
	rating: number;
}

const ShowCard = ({ _id, name, type, image, rating }: Props) => {
	const showLink = `/${type}/${_id}`;
	return (
		<div className="rounded-xl bg-[#22252f] overflow-hidden p-2">
			{/* Image Container */}
			<Link href={showLink} className="overflow-hidden">
				<img className="rounded-xl" src={staticURL + "/show/" + image} alt={name} />
			</Link>
			{/* Rating */}
			<div className="my-2 p-1 flex items-center gap-1 bg-yellow-300 bg-opacity-50 border border-yellow-300 w-fit text-yellow-400 rounded-lg">
				<FaStar />
				<h3 className="text-white">{rating.toFixed(1)}</h3>
			</div>
			<h1 className="text-3xl font-medium mb-4 w-fit">
				<Link href={showLink} className="w-fit">
					{name}
				</Link>
			</h1>
		</div>
	);
};

export default ShowCard;
