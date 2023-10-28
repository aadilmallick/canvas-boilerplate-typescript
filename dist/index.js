#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import figlet from "figlet";
import inquirer from "inquirer";
import fs from "fs";
import fsPromise from "fs/promises";
import { createSpinner } from "nanospinner";
import path from "path";
import child_process from "child_process";
import { fileURLToPath } from "url";
const currentDir = path.dirname(fileURLToPath(import.meta.url));
console.log(figlet.textSync("Canvas Boilerplate"));
// const program = new Command();
function generatePackageJSON(dirName) {
    return `{
        "name": "${dirName}",
        "module": "src/index.ts",
        "type": "module",
        "devDependencies": {
          "bun-types": "latest"
        },
        "peerDependencies": {
          "typescript": "^5.0.0"
        },
        "typings": "src/types.d.ts",
        "scripts": {
          "build": "bun build --minify --outdir dist src/index.ts"
        }
      }`;
}
// program.version("0.0.1");
function getDirName() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield inquirer.prompt({
            name: "dirName",
            type: "input",
            message: "Enter the name of the directory:",
            default: () => {
                return "canvas-project";
            },
        });
        return result.dirName;
    });
}
function checkFolderNameIsValid(dirName) {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = createSpinner("Checking if directory name is okay...").start();
        if (fs.existsSync(dirName)) {
            spinner.error({
                text: "Directory already exists",
            });
            return false;
        }
        else {
            yield fsPromise.mkdir(dirName);
            spinner.success({
                text: "Directory created",
            });
            return true;
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dirName = yield getDirName();
        const dirNameIsValid = yield checkFolderNameIsValid(dirName);
        if (!dirNameIsValid) {
            process.exit(1);
        }
        const templateFolderPath = path.join(currentDir, "..", "template");
        console.log(templateFolderPath);
        const spinner = createSpinner("Scaffolding files...").start();
        child_process.execSync(`cp -r ${templateFolderPath}/* ${dirName}`);
        const packageJSONContent = generatePackageJSON(dirName);
        yield fsPromise.writeFile(path.join(dirName, "package.json"), packageJSONContent);
        spinner.success({
            text: "files created. Run bun install to get started",
        });
        process.chdir(dirName);
    });
}
main();
//# sourceMappingURL=index.js.map