interface Props {
	name: string;
	number: number;
}

const Stat = ({ name, number }: Props) => {
	return (
		<div className="flex flex-col flex-1">
			<h3 className="text-xl">{name}</h3>
			<h1 className="text-6xl text-mainColor">{number}</h1>
		</div>
	);
};

export default Stat;
