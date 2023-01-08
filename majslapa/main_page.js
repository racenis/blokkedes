const web3 = new Web3(window.ethereum);

const doom_contract_address = "0x827dBE49971135303A01e99AC3e34Bda65F083fD";

var doom_contract;
var user_account;

window.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum === 'undefined') {
		alert("Nav metamaskas!!!! vajag instalēt!!!!");
	}
	
	const doom_contract_abi = await (await fetch("doom_abi.json")).json();

	doom_contract = new web3.eth.Contract(doom_contract_abi, doom_contract_address);
	user_account = await ethereum.enable();
	
	console.log(doom_contract);
	console.log(user_account);
});

async function vote_for_input (input) {
	const response = await doom_contract.methods.Vote(input).send({from: user_account[0]});
}
