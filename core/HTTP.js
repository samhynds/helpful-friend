const axios = require("axios");

class HTTP {
  static get(url, options) {
    return axios.get(url, options);
  }
}

module.exports = HTTP;
