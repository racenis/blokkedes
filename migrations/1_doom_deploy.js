const Doom = artifacts.require("Doom");

module.exports = async function (deployer) {
	await deployer.deploy(Doom);
	
	let doom = await Doom.deployed();
	
	await doom.Vote(1);
	await doom.UpdateState(0);
	await doom.Vote(1);
	await doom.UpdateState(0);
	await doom.Vote(1);
	await doom.UpdateState(0);
	
	await doom.Vote(6);
	await doom.UpdateState(0);
	await doom.Vote(0);
	await doom.UpdateState(0);
	await doom.Vote(6);
	await doom.UpdateState(0);
	await doom.Vote(0);
	await doom.UpdateState(0);
	await doom.Vote(6);
	await doom.UpdateState(0);
	
	await doom.Vote(1);
	await doom.UpdateState(0);
	await doom.Vote(1);
	await doom.UpdateState(0);
};