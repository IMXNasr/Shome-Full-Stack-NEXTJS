import { model, models, Schema } from "mongoose";

const ShowSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  genres: {type: Array},
  description: {type: String},
  released_date: {type: Date},
  rating: {type: Number, default: 0},
  num_episodes: {type: Number},
  runtime: {type: Number},
  trailer_link: {type: String},
  country: {type: String},
  image: {type: String},
  cover: {type: String},
  featured: {type: Boolean},
  date_added: {type: Date, default: Date.now},
});

const Show = models.Show || model('Show', ShowSchema);
export default Show;