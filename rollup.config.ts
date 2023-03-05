import dts from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import {readFileSync} from "fs";

const pkg = JSON.parse(readFileSync("./package.json") as unknown as string);

const input = "src/index.tsx";
const cjsOutput = {file: pkg.main, format: "cjs", exports: "auto"};
const esmOutput = {file: pkg.module, format: "es"};
const dtsOutput = {file: pkg.types, format: "es"};

const jsonPlugin = json();
const cssPlugin = postcss();
const tsPlugin = typescript();

const external = [
	...Object.keys({...pkg.dependencies, ...pkg.peerDependencies}),
	/^react($|\/)/,
	/^antd($|\/)/,
	/\.css$/,
];

export default [
	{input, output: cjsOutput, plugins: [tsPlugin, jsonPlugin, cssPlugin], external},
	{input, output: esmOutput, plugins: [tsPlugin, jsonPlugin, cssPlugin], external},
	{input, output: dtsOutput, plugins: [dts()], external: [/\.css$/]},
];
