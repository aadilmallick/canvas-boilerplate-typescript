#! /usr/bin/env node

import figlet from "figlet";
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import fsPromise from "fs/promises";
import { createSpinner } from "nanospinner";
import path from "path";
import { glob } from "glob";
import child_process from "child_process";
import { fileURLToPath } from "url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

console.log(figlet.textSync("Canvas Boilerplate"));

// const program = new Command();
function generatePackageJSON(dirName: string) {
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

async function getDirName() {
  const result = await inquirer.prompt({
    name: "dirName",
    type: "input",
    message: "Enter the name of the directory:",
    default: () => {
      return "canvas-project";
    },
  });

  return result.dirName as string;
}

async function checkFolderNameIsValid(dirName: string) {
  const spinner = createSpinner(
    "Checking if directory name is okay..."
  ).start();
  if (fs.existsSync(dirName)) {
    spinner.error({
      text: "Directory already exists",
    });
    return false;
  } else {
    await fsPromise.mkdir(dirName);
    spinner.success({
      text: "Directory created",
    });
    return true;
  }
}

async function main() {
  const dirName = await getDirName();

  const dirNameIsValid = await checkFolderNameIsValid(dirName);
  if (!dirNameIsValid) {
    process.exit(1);
  }

  const templateFolderPath = path.join(currentDir, "..", "template");
  console.log(templateFolderPath);
  const spinner = createSpinner("Scaffolding files...").start();
  child_process.execSync(`cp -r ${templateFolderPath}/* ${dirName}`);

  const packageJSONContent = generatePackageJSON(dirName);
  await fsPromise.writeFile(
    path.join(dirName, "package.json"),
    packageJSONContent
  );

  spinner.success({
    text: "files created. Run bun install to get started",
  });
  process.chdir(dirName);
}

main();
