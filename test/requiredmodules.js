/* eslint-disable global-require */
module.exports = {
  chai: require("chai"),
  chaiHttp: require("chai-http"),
  equal: require("deep-equal"),
  sinon: require("sinon"),

  server: require("../index"),
  Database: require("../database"),
  should: require("chai").should(),
};
