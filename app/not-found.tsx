const NotFound = () => {
	return (
		<div className="absolute top-0 left-0 w-full h-full -z-10 flex items-center justify-center">
			<div>
				<h1 className="text-sm flex items-center">
					<span className="text-2xl">404</span>
					<div className="w-[1px] h-12 bg-gray-600 mx-5" />
					This page could not be found.
				</h1>
			</div>
		</div>
	);
};

export default NotFound;
