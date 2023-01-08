const Doom = artifacts.require("Doom");

module.exports = function (deployer) {
  deployer.deploy(Doom);
};