const Model = require("./university.model");

// API Transformer
const formOneTransformer = function (payload) {
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
    form_one: {
      uni_name: payload.uni_name,
      contact_name: payload.contact_name,
      website_url: payload.website_url,
      email: payload.email,
      staging_url: payload.staging_url,
      technical_contact_name: payload.technical_contact_name,
      technical_contact_email: payload.technical_contact_email,
      buckets: _buckets,
    },
  };
};

const formTwoTransformer = function (payload) {
  let _users = [];
  if (Array.isArray(payload.full_name)) {
    for (let i = 0; i < payload.full_name.length; i++) {
      const users = {
        full_name: payload.full_name[i],
        job_role: payload.job_role[i],
        email: payload.email[i],
        user_level: payload.user_level[i],
      };
      _users.push(users);
    }
  }
  return {
    form_two: {
      server: payload.server,
      install: payload.install,
      server_access: payload.server_access,
      server_address: payload.server_address,
      server_username: payload.server_username,
      server_password: payload.server_password,
      cms_web_url: payload.cms_web_url,
      cms_username: payload.cms_username,
      cms_password: payload.cms_password,
      additional_users: _users,
    },
  };
};

const getUniversityDetails = async (id) => {
  return await Model.findOne({ _id: id });
};

const createFromOne = async (payload) => {
  console.log({ surukopaylod: payload });
  const transformedData = formOneTransformer(payload);
  return await Model.create(transformedData);
};

const updateFormOne = async (id, payload) => {
  console.log({ id, payload });
  const formOneTransformerData = formOneTransformer(payload);
  try {
    const updateDocument = await Model.findOneAndUpdate(
      { _id: id },
      formOneTransformerData,
      {
        new: true,
      }
    );
    console.log({ updateDocument });
    if (!updateDocument) {
      return null;
    }
    return updateDocument;
  } catch (err) {
    throw err;
  }
};
const updateFormTwo = async (id, payload) => {
  const formTwoTransformerData = formTwoTransformer(payload);
  try {
    const updateDocument = await Model.findOneAndUpdate(
      { _id: id },
      formTwoTransformerData, // Update the 'form_two' field with new data
      {
        new: true,
      }
    );
    console.log({ updateDocument });
    if (!updateDocument) {
      return null;
    }
    return updateDocument;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createFromOne,
  updateFormOne,
  updateFormTwo,
  getUniversityDetails,
};
