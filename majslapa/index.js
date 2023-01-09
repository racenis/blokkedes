const http = require('http');
const fs = require('fs');
const Web3 = require("web3");

const blokchain_emulator = "http://localhost:7545";
const doom_contract_address = "0x02346518Ec85A950bf2bf6fdeAF12581c6f7Df56";

const web3 = new Web3(blokchain_emulator);

const doom_contract_abi = fs.readFileSync("doom_abi.json");
const doom_contract = new web3.eth.Contract(JSON.parse(doom_contract_abi), doom_contract_address);


// visi atļautie faili
const files = [
	"/bepis.gif",
	"/background.gif",
	"/background2.gif",
	"/button1.gif",
	"/button2.gif",
	"/button3.gif"
];

const server = http.createServer(async (req, res) => {
	if (req.url == "/favicon.ico") {
		res.statusCode = 200;
		res.setHeader("Content-Type", "image/vnd.microsoft.icon");
		res.end(fs.readFileSync("favicon.ico"));
	} else if (req.url == "/doom_abi.json") {
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.end(doom_contract_abi);
	} else if (req.url == "/web3.js") {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/javascript");
		res.end(fs.readFileSync("node_modules/web3/dist/web3.min.js"));
	} else if (req.url == "/main_page.js") {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/javascript");
		res.end(fs.readFileSync("main_page.js"));
	} else if (req.url == "/results.lmp") {
		console.log("Prepering the lump...");
		const inputs = await doom_contract.methods.GetInputs().call();
		const level = await doom_contract.methods.GetLevel().call();
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/octet-stream");
		res.write(Buffer.from(make_lump(inputs, level)), 'binary');
		res.end(null, 'binary');
	} else if (files.includes(req.url)) {
		const req_image = fs.readFileSync(req.url.substring(1));
		res.statusCode = 200;
		res.setHeader("Content-Type", "image/gif");
		res.end(req_image);
	} else {
		const main_page_html = fs.readFileSync("main_page.html", "utf8");
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/html");
		res.end(main_page_html);
	}
	
	//console.log(req.method);
	//console.log(req.url);
	
	

});

server.listen(80, "127.0.0.1", () => {
  console.log("STARTĒTIES");
});

function make_lump (inputs, level) {
	lump = [0x6D, 2, 1, level, 0, 0, 0, 0, 0, 1, 0, 0, 0]
	
	for (let i = 0; i < inputs.length; i++) {
		let command;
		let repeats;
		let waits;
		
		switch (inputs[i]) {
			case '0':	command = [0, 0, 0, 0];		repeats = 16;	waits = 0;	break;
			case '1':	command = [25, 0, 0, 0];	repeats = 16;	waits = 0;	break;
			case '2':	command = [-25, 0, 0, 0];	repeats = 16;	waits = 0;	break;
			case '3':	command = [0, -25, 0, 0];	repeats = 16;	waits = 0;	break;
			case '4':	command = [0, 25, 0, 0];	repeats = 16;	waits = 0;	break;
			case '5':	command = [0, 0, 25, 0];	repeats = 1;	waits = 15;	break;
			case '6':	command = [0, 0, -25, 0];	repeats = 1;	waits = 15;	break;
			case '7':	command = [0, 0, 0, 1];		repeats = 1;	waits = 31;	break; // hmm
			case '8':	command = [0, 0, 0, 2];		repeats = 1;	waits = 15;	break;
			case '9':	command = [0, 0, 0, 0x04];	repeats = 1;	waits = 23;	break;
			case '10':	command = [0, 0, 0, 0x0C];	repeats = 1;	waits = 31;	break;
			case '11':	command = [0, 0, 0, 0x14];	repeats = 1;	waits = 31;	break;
			case '12':	command = [0, 0, 0, 0x1C];	repeats = 1;	waits = 31;	break;
			case '13':	command = [0, 0, 0, 0x24];	repeats = 1;	waits = 31;	break;
			case '14':	command = [0, 0, 0, 0x2C];	repeats = 1;	waits = 31;	break;
			case '15':	command = [0, 0, 0, 0x34];	repeats = 1;	waits = 31;	break;
			case '16':	command = [0, 0, 0, 0x3C];	repeats = 1;	waits = 31;	break;
		}
		
		for (let i = 0 ; i < repeats; i++) {
			lump = lump.concat(command);
		}
		
		for (let i = 0 ; i < waits; i++) {
			lump = lump.concat([0, 0, 0, 0]);
		}
	}
	
	for (let i = 0 ; i < 256; i++) {
		lump = lump.concat([0, 0, 0, 0]);
	}
	
	return lump;
}