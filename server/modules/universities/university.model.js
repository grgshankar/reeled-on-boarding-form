const { v4: uuidv4 } = require("uuid");
const { Schema, model } = require("mongoose");
const commonSchema = require("../../utils/commonSchema");
const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
const universitySchema = new Schema({
  _id: { type: String, default: uuidv4 },
  form_one: {
    uni_name: { type: String },
    contact_name: { type: String },
    website_url: { type: String },
    email: {
      type: String,
      trim: true, // removing the white space
      lowercase: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    staging_url: { type: String },
    technical_contact_name: { type: String },
    technical_contact_email: {
      type: String,
      trim: true, // removing the white space
      lowercase: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    buckets: [
      {
        bucket_name: { type: String },
        bucket_areas: { type: String },
        bucket_brief: { type: String },
      },
    ],
  },
  form_two: {
    server: { type: String },
    install: { type: String },
    server_access: { type: String },
    server_address: { type: String },
    server_username: { type: String },
    server_password: { type: String },
    cms_web_url: { type: String },
    cms_username: { type: String },
    cms_password: { type: String },
    additional_users: [
      {
        full_name: { type: String },
        job_role: { type: String },
        email: {
          type: String,
          trim: true, // removing the white space
          lowercase: true,
          required: "Email address is required",
          validate: [validateEmail, "Please fill a valid email address"],
          match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
          ],
        },
        user_level: { type: String },
      },
    ],
  },

  ...commonSchema,
});

module.exports = model("University", universitySchema);
