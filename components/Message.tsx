const Message = ({ type, children }: { type: "success" | "error"; children: string }) => {
	if (type === "success") return <div className="bg-transparent w-full p-3 text-green-600 border-green-600 border-2 rounded">{children}</div>;
	if (type === "error") return <div className="bg-transparent w-full p-3 text-red-600 border-red-600 border-2 rounded">{children}</div>;
};

export default Message;
