const surccessResponse = function (keys, response, msg) {
  let filteredData = {};

  // Iterate over the keys array and extract the corresponding properties
  for (const key of keys) {
    if (response.hasOwnProperty(key)) {
      filteredData[key] = response[key];
    }
  }

  return { data: filteredData, msg: msg };
};

module.exports = { surccessResponse };
