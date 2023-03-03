import dts from "rollup-plugin-dts";
import less from "rollup-plugin-less";
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
const tsPlugin = typescript();
const cssPlugin = postcss({exclude: /\.less$/, include: /\.css$/});
const lessPlugin = less({insert: true, output: false, option: {javascriptEnabled: true}});

const external = [
	...Object.keys({...pkg.dependencies, ...pkg.peerDependencies}),
	/^react($|\/)/,
	/^antd($|\/)/,
	/\.css$/,
];

export default [
	{input, output: cjsOutput, plugins: [tsPlugin, jsonPlugin, cssPlugin, lessPlugin], external},
	{input, output: esmOutput, plugins: [tsPlugin, jsonPlugin, cssPlugin, lessPlugin], external},
	{input, output: dtsOutput, plugins: [dts()], external: [/\.(le|c)ss$/]},
];
