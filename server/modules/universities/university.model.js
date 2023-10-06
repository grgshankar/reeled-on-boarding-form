const { v4: uuidv4 } = require("uuid");
const { Schema, model } = require("mongoose");
const commonSchema = require("../../utils/commonSchema");
const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
const bucketSchema = new Schema({
  bucket_name: { type: String },
  bucket_areas: { type: String },
  bucket_brief: { type: String },
});
// const userSchema = new Schema({
//   fullName: { type: String },
//   jobRole: { type: String },
//   email: {
//     type: String,
//     trim: true,
//     lowercase: true,
//     unique: true,
//     required: "Email address is required",
//     validate: [
//       /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
//       "Please fill a valid email address",
//     ],
//   },
//   userLevel: { type: String },
// });
const universitySchema = new Schema({
  _id: { type: String, default: uuidv4() },
  uni_name: { type: String, required: true },
  contact_name: { type: String, required: true },
  website_url: { type: String, required: true },
  staging_url: { type: String, required: true },
  email: {
    type: String,
    trim: true, // removing the white space
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  technical_contact_name: { type: String },
  technical_contact_email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true, // This line indicates the field should be unique
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  buckets: [bucketSchema],
  // server: { type: String },
  // install: { type: String },
  // server_access: { type: String },
  // server_address: { type: String },
  // server_username: { type: String },
  // server_password: { type: String },
  // cms_web_url: { type: String },
  // cms_username: { type: String },
  // cms_password: { type: String },
  // additionalUsers: [userSchema],
  ...commonSchema,
});

module.exports = model("University", universitySchema);
