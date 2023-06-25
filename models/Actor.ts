import { model, models, Schema } from "mongoose";

const ActorSchema = new Schema({
  name: {type: String, required: true},
  gender: {type: String},
  biography: {type: String},
  birthday: {type: Date},
  place_of_birth: {type: String},
  photo: {type: String},
  date_added: {type: Date, default: Date.now}
});

const Actor = models.Actor || model('Actor', ActorSchema);
export default Actor;