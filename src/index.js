const zip = require("./zip/zipcode");
// lambda-like handler function
module.exports.handler = async event => {
  if (event.path === "/resouce" && event.httpMethod === "POST") {
    let result = await zip.search(event.body);
    return result;
  } else {
    throw Error("Invalid Path or HTTPMethod");
  }
};
