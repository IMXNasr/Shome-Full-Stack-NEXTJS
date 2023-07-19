import { model, models, Schema } from "mongoose";

const ActSchema = new Schema({
	actor: { type: Schema.Types.ObjectId, ref: "Actor", required: true },
	show: { type: Schema.Types.ObjectId, ref: "Show", required: true },
	act_as: { type: String },
});

const Act = models.Act || model("Act", ActSchema);
export default Act;
