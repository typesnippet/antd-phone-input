import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const name = packageJson.name;

for (const pkgFile of ["examples/antd4.x/package.json", "examples/antd5.x/package.json", "examples/antd6.x/package.json"]) {
    const packageJson = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
    fs.readdir(".", (_, files) => {
        packageJson.dependencies[name] = "file:../../" + files.find(file => {
            return file.startsWith(name) && file.endsWith("tgz");
        });
        fs.writeFileSync(pkgFile, JSON.stringify(packageJson, null, 2));
    })
}
