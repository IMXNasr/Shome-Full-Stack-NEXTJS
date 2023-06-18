import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	admin: { type: Boolean },
	date_joined: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;
