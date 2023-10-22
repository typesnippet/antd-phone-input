import fs from "fs";
import util from "node:util";
import process from "node:child_process";

const exec = (command: string) => util.promisify(process.exec)(command);

(async () => {
	await exec("bash -c 'cp src/legacy/*.css legacy'");

	const style = fs.readFileSync("node_modules/react-phone-input-2/lib/style.css");
	const regex = /(\.react-tel-input)\s\.flag.+\1\s*\.\w{2}\b\s*\{[^{}]*}/;
	const flags = "\n" + (style.toString().match(regex) || [""])[0];

	let styles = fs.readFileSync("./legacy/style5.css", "utf8") + flags;
	styles = styles.replaceAll(/\/\*\*.*?\*\/[\n\s]*/gs, "");
	styles = styles.replaceAll(/\B[^{}]*?\{[\s\n]}/g, "");
	styles = styles.replaceAll(/\//g, "\\\/");
	styles = styles.replaceAll(/\n\s*/g, "");

	await exec(`find legacy -maxdepth 1 -name '*.js' -type f -exec sed -i 's/style5.css/${styles}/g' {} +`);
	await exec("find . legacy -maxdepth 1 \\( -name '*.ts' -o -name '*.js' \\) -type f -exec sed -i 's/antd\\/lib/antd\\/es/g' {} +");
})();
