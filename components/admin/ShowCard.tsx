import Link from "next/link";

interface Props {
  icon: any;
  name: string;
  link: string;
}

const AdminShowCard = ({icon, name, link}: Props) => {
  return (
    <Link href={link} className="rounded-lg py-3 px-4 border flex items-center gap-2 hover:border-mainColor hover:bg-mainColor transition-colors">
      {icon}
      <h1 className="text-2xl">{name}</h1>
    </Link>
  )
}

export default AdminShowCard;