const Doom = artifacts.require("Doom");

module.exports = async function (deployer) {
	console.log("Deploying doom...");
	await deployer.deploy(Doom);
	
	console.log("Getting doom...");
	let doom = await Doom.deployed();
	
	console.log("Voting...");
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
	
	console.log("Done!");
};