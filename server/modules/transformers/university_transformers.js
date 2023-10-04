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
    technical_contact_name: payload.technical_contact_name,
    buckets: _buckets,
  };
};

module.exports = { registerTransformer };
