import { Navbar } from "@/components";
import { getTitle } from "@/utils/functions";

export const generateMetadata = () => {
		return {
			title: getTitle("404 Not Found"),
		};
};

const NotFound = () => {
	return (
		<>
			<Navbar />
      <div className="grid place-items-center h-[100vh] absolute w-full top-0 -z-10">
        <h2 className="text-5xl font-thin text-gray-200">404 | Not Found</h2>
      </div>
		</>
	);
};

export default NotFound;
