import util from "node:util";
import process from "node:child_process";

import stylesheet from "../resources/stylesheet.json";

const exec = (command: string) => util.promisify(process.exec)(command, {shell: "/bin/bash"});

(async () => {
	let styles = Object.entries(stylesheet).map(([selector, rules]) => {
		return `${selector} {` + Object.entries(rules).map(([key, value]) => {
			return `${key}: ${value}; `;
		}).join("") + "} ";
	}).join("");

	await exec(`ls *.js | xargs -I {} sed -i 's/styles.css/${styles}/g' {}`);
	await exec("ls *.{j,t}s | xargs -I {} sed -i 's/antd\\/lib/antd\\/es/g' {}");
})();
