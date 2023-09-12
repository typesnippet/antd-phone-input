import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import {readFileSync} from "fs";

const pkg = JSON.parse(readFileSync("./package.json") as unknown as string);

const input4 = "src/legacy/index.tsx";
const input5 = "src/index.tsx";
const cjsInput4 = {file: "dist/legacy/index.cjs.js", format: "cjs", exports: "auto"};
const esmInput4 = {file: "dist/legacy/index.esm.js", format: "es"};
const dtsInput4 = {file: "dist/legacy/index.d.ts", format: "es"};
const cjsInput5 = {file: "dist/index.cjs.js", format: "cjs", exports: "auto"};
const esmInput5 = {file: "dist/index.esm.js", format: "es"};
const dtsInput5 = {file: "dist/index.d.ts", format: "es"};

const stringifier = (root: any, builder: any) => {
	/** Include the CSS rules describing the flags after the main styles */
	const style = readFileSync("node_modules/react-phone-input-2/lib/style.css");
	const regex = /(\.react-tel-input)\s\.flag.+\1\s*\.\w{2}\b\s*\{[^{}]*}/;
	const rules: any = style.toString().match(regex);
	builder(root.toString() + "\n" + (rules ? rules[0] : ""));
}

const jsonPlugin = json();
const cssPlugin = postcss({stringifier});
const tsPlugin = typescript();
const aliasPlugin = alias({entries: {"antd/lib": "antd/es"}});

const external = [
	...Object.keys({...pkg.dependencies, ...pkg.peerDependencies}),
	/^react($|\/)/,
	/^antd($|\/es\/)/,
];

export default [
	{input: input4, output: cjsInput4, plugins: [tsPlugin, jsonPlugin, cssPlugin], external},
	{input: input4, output: esmInput4, plugins: [tsPlugin, jsonPlugin, cssPlugin], external},
	{input: input4, output: dtsInput4, plugins: [dts()], external: [/\.css$/]},
	{input: input5, output: cjsInput5, plugins: [tsPlugin, jsonPlugin, cssPlugin, aliasPlugin], external},
	{input: input5, output: esmInput5, plugins: [tsPlugin, jsonPlugin, cssPlugin, aliasPlugin], external},
	{input: input5, output: dtsInput5, plugins: [dts()], external: [/\.css$/]},
];
