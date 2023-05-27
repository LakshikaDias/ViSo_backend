const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  NIC: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address: { type: String },
  gender: { type: String },
  profession: { type: String, required: true },
  country: { type: String, required: true },
  education: { type: String, required: true },
});

module.exports = mongoose.model("user", userSchema);
