import fs from "fs";
import util from "node:util";
import process from "node:child_process";

const exec = (command: string) => util.promisify(process.exec)(command, {shell: "/bin/bash"});

(async () => {
	let styles = fs.readFileSync("./src/styles.css", "utf8");
	styles = styles.replaceAll(/\/\*\*.*?\*\/[\n\s]*/gs, "");
	styles = styles.replaceAll(/\B[^{}]*?\{[\s\n]}/g, "");
	styles = styles.replaceAll(/\//g, "\\\/");
	styles = styles.replaceAll(/\n\s*/g, "");

	await exec(`ls *.js | xargs -I {} sed -i 's/styles.css/${styles}/g' {}`);
	await exec("ls *.{j,t}s | xargs -I {} sed -i 's/antd\\/lib/antd\\/es/g' {}");
})();
