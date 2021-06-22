const { spawn, exec } = require("child_process");

const readline = require('readline');


exec('chcp 65001');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log('\t\x1b[1;33m', 'Введите ip нужного оборутования\n');

rl.question('\t \x1b[36m192.168.?.?: ', (answer) => {
	let str = '192.168.' + answer;
	const ping = spawn("ping", [str, "-t"]);

	ping.stdout.on("data", data => {
		console.log('\x1b[35m', data.toString());

	});

	ping.stderr.on("data", data => {
		console.log(`stderr: ${data}`);
	});

	ping.on('error', (error) => {
		console.log(`error: ${error.message}`);
	});

	ping.on("close", code => {
		console.log(`child process exited with code ${code}`);
	});

});