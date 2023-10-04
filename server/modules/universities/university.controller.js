const Model = require("./university.model");
// API Transformer

const registerTransformer = function (payload) {
  let _buckets = [];

  if (Array.isArray(payload.bucket_name)) {
    // Iterate over the array of bucket names and create objects in the _buckets array
    for (let i = 0; i < payload.bucket_name.length; i++) {
      const bucket = {
        bucket_name: payload.bucket_name[i],
        bucket_areas: payload.bucket_areas[i],
        bucket_brief: payload.bucket_brief[i],
        // Add other properties from the payload as needed
      };
      _buckets.push(bucket);
    }
  }

  return {
    uni_name: payload.uni_name,
    contact_name: payload.contact_name,
    website_url: payload.website_url,
    staging_url: payload.staging_url,
    email: payload.email,
    technical_contact_email: payload.technical_contact_email,
    technical_contact_name: payload.technical_contact_name,
    buckets: _buckets,
  };
};

// CRUD

const create = async (payload) => {
  const transformedData = registerTransformer(payload);
  return await Model.create(transformedData);

  // if (!payload.technical_contact_email) {
  //   throw new Error("Technical contact email is required.");
  // }
  // return await Model.create(payload);
};

const getDetails = async (id) => {
  return await Model.findOne({ _id: id });
};
// const updateById = async (_id, payload) => {
//   return await Model.findOne({ _id: _id });
// };

module.exports = { create, getDetails };
