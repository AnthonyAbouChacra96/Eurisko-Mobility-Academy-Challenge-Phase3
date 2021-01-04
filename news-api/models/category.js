const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
	name: {
		type: String,
    required: true,
  },
	description: {
		type: String,
		required: true,
	},
  feeds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feed",
    },
  ],
});
module.exports = mongoose.model("Category", categorySchema);
