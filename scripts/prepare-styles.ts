import fs from "fs";
import util from "node:util";
import process from "node:child_process";

const exec = (command: string) => util.promisify(process.exec)(command);

(async () => {
	await exec("bash -c 'cp src/legacy/*.{le,c}ss legacy'");

	let styles = fs.readFileSync("./legacy/style5.css", "utf8");
	styles = styles.replaceAll(/\/\*\*.*?\*\/[\n\s]*/gs, "");
	styles = styles.replaceAll(/\B[^{}]*?\{[\s\n]}/g, "");
	styles = styles.replaceAll(/\n\s*/g, "");

	await exec(`find legacy -maxdepth 1 -name '*.js' -type f -exec sed -i 's/style5.css/${styles}/g' {} +`);
	await exec("find . legacy -maxdepth 1 \\( -name '*.ts' -o -name '*.js' \\) -type f -exec sed -i 's/antd\\/lib/antd\\/es/g' {} +");
})();
