"use client";

import React, { FormEvent, useState } from "react";
import { RiMovie2Fill } from "react-icons/ri";
import { FaBars, FaSearch, FaUser } from "react-icons/fa";
import { appName, navLinks } from "@/utils/constants";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";

interface LinkListProps {
	mobile?: boolean;
	onClick?: any;
}

interface SearchProps {
	mobile?: boolean;
	setShowMobileNav?: any;
}

interface NavButtonsProps {
	mobile?: boolean;
	onClick?: any;
	username?: string;
}

const LinkList = ({ mobile = false, onClick }: LinkListProps) => {
	const params = useParams();
	return (
		<ul className={`${!mobile ? "hidden" : ""} xl:flex ${mobile ? "flex flex-col" : "flex-row"} ${!mobile && "items-center"} gap-4`}>
			{/* flex */}
			{navLinks.map((l, idx) => (
				<Link key={idx} onClick={onClick} className={`${params.type && l.link.includes(params.type) && "text-mainColor"} mx-2 hover:text-mainColor transition-colors`} href={l.link}>
					{l.name}
				</Link>
			))}
		</ul>
	);
};

const Search = ({ mobile = false, setShowMobileNav }: SearchProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [search, setSearch] = useState(searchParams.get("search") || "");
	const searchFn = (e: FormEvent) => {
		e.preventDefault();
		if (mobile) {
			setShowMobileNav(false);
		}
		router.push("/all/?search=" + search);
	};
	return (
		<form onSubmit={searchFn} className={`${!mobile ? "hidden" : ""} ${mobile ? "flex" : ""} xl:flex items-center border rounded-xl p-2`} method="POST">
			<button className="text-gray-200 mx-2" type="submit">
				<FaSearch />
			</button>
			<input className="bg-transparent flex-1 focus:outline-none" type="text" name="search" id="search" placeholder="What do you want to watch?" value={search} onChange={(e) => setSearch(e.target.value)} />
		</form>
	);
};

const NavButtons = ({ mobile, onClick }: NavButtonsProps) => {
	const { data: session } = useSession();
	const { status } = useSession();
	console.log(status, session);
	return (
		<div className={`${!mobile ? "hidden" : ""} ${mobile ? "flex" : ""} xl:flex`}>
			{status === "unauthenticated" ? (
				<>
					<Link onClick={onClick} href="/register">
						<button className="pointer-events-none py-2 px-4 bg-mainColor rounded-xl">Register</button>
					</Link>
					<Link onClick={onClick} href="/login">
						<button className="pointer-events-none py-2 px-4 rounded-xl ml-2 border">Login</button>
					</Link>
				</>
			) : status === "authenticated" ? (
				<Link onClick={onClick} href="/profile">
					<button className="pointer-events-none py-2 px-4 rounded-xl ml-2 border flex items-center gap-2">
						<FaUser size={14} /> {session?.user?.username}
					</button>
				</Link>
			) : (
				<Spinner size={40} />
			)}
		</div>
	);
};

const Navbar = () => {
	const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
	return (
		<nav>
			<div className="container py-4 flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="text-3xl flex items-center text-mainColor">
					<RiMovie2Fill />
					<h1 className="pointer-events-none selection:bg-transparent selection:text-mainColor">{appName}</h1>
				</Link>
				{/* Links */}
				<LinkList />
				{/* Search */}
				<Search />
				{/* Buttons */}
				<NavButtons />
				{/* Bars */}
				<button className="text-mainColor text-2xl xl:hidden" onClick={() => {}}>
					<FaBars onClick={() => setShowMobileNav(true)} />
				</button>
				{/* Mobile View */}
				{showMobileNav && (
					//! Maybe the next line cause ERRORS
					<div
						className="fixed xl:hidden w-full h-full top-0 left-0 bg-bgDark/50 z-10"
						onClick={(e: any) => {
							setShowMobileNav(e.target.classList.contains("fixed") || e.target.localName === "a" ? false : true);
						}}
					>
						<div className="container pointer-events-none">
							<div className="flex flex-col bg-bgDark relative rounded-2xl top-20 py-4 px-2 border gap-4 pointer-events-auto">
								<LinkList mobile onClick={() => setShowMobileNav(false)} />
								<Search mobile setShowMobileNav={setShowMobileNav} />
								<NavButtons mobile onClick={() => setShowMobileNav(false)} />
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
