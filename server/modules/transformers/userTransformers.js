const userTransformers = function (payload) {
  let _users = [];
  if (Array.isArray(payload.fullName)) {
    // Iterate over the array of bucket names and create objects in the _buckets array
    for (let i = 0; i < payload.fullName.length; i++) {
      const users = {
        fullName: payload.fullName[i],
        jobRole: payload.jobRole[i],
        email: payload.email[i],
        userLevel: payload.userLevel[i],
        // Add other properties from the payload as needed
      };
      _users.push(users);
    }
  }
  return {
    server: payload.server,
    install: payload.install,
    server_access: payload.server_access,
    additionalUsers: _users,
  };
};

module.exports = { userTransformers };
