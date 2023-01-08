const http = require('http');
const fs = require('fs');
const Web3 = require("web3");

const blokchain_emulator = "http://localhost:7545";
const doom_contract_address = "0x827dBE49971135303A01e99AC3e34Bda65F083fD";

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
		const response = await doom_contract.methods.GetInputs().call();
		console.log(response);
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/octet-stream");
		const buffer = Buffer.from([0, 1, 2, 3, 4, 5, 69]);
		res.write(buffer, 'binary');
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