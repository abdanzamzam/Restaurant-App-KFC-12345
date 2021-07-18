const axios = require("axios");

const instanceAxiosImageKit = axios.create({
  baseURL: "https://upload.imagekit.io/api/v1",
  headers: {
    Authorization:
      "Basic " + Buffer.from(process.env.PRIVATE_KEY).toString("base64"),
    // auth: {
    //     username: 'private_XotH8i8Q4WoIJx80JBEi18m7BgY='
    // }
  },
});

module.exports = instanceAxiosImageKit;
