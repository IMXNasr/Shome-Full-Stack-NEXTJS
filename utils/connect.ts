import mongoose from "mongoose";

const connect = async () => mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL as string);

export default connect;