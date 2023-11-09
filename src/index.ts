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
import gradient from "gradient-string";

function gradientText(text: string) {
  return new Promise((resolve, reject) => {
    figlet(text, (err, data) => {
      console.log(gradient.pastel.multiline(data));
      resolve(data);
    });
  });
}

const currentDir = path.dirname(fileURLToPath(import.meta.url));

// console.log(figlet.textSync("Canvas Boilerplate"));

function generatePackageJSON(dirName: string, isP5: boolean, isNpm: boolean) {
  if (isP5) {
    return `{
      "name": "${dirName}",
      "module": "src/index.ts",
      "type": "module",
      "devDependencies": {
        "@types/p5": "^1.7.1"${!isNpm ? "," : ""}
        ${!isNpm ? `"bun-types": "latest"` : ""}
      },
      "peerDependencies": {
        "typescript": "^5.0.0"
      },
      "dependencies": {
        "p5": "^1.8.0"
      }, 
      "scripts": {
        "build": "${
          isNpm
            ? "tsc -w"
            : "bun build --minify --watch --outdir dist src/index.ts"
        }"
      }
    }`;
  }
  return `{
        "name": "${dirName}",
        "module": "src/index.ts",
        "type": "module",
        "devDependencies": {
          ${!isNpm ? `"bun-types": "latest"` : ""}
        },
        "peerDependencies": {
          "typescript": "^5.0.0"
        },
        "typings": "src/types.d.ts",
        "scripts": {
          "build": "${
            isNpm
              ? "tsc -w"
              : "bun build --minify --watch --outdir dist src/index.ts"
          }"
        }
      }`;
}

function generateTsConfig(isNpm: boolean, isP5: boolean) {
  if (isNpm) {
    return `{
      "compilerOptions": {
        "target": "es2016",
        "module": "ESNext",
        "rootDir": "./src",
        "outDir": "./dist",
        "esModuleInterop": true,
        "strict": true,
        "skipLibCheck": true
      },
      "include": ["./src/**/*"],
      "exclude": ["node_modules"]
    }`;
  }
  return `{
    "compilerOptions": {
      "lib": ["ESNext"],
      "module": "esnext",
      "target": "esnext",
      "moduleResolution": "bundler",
      "moduleDetection": "force",
      "allowImportingTsExtensions": true,
      "noEmit": true,
      "composite": true,
      "strict": true,
      "downlevelIteration": true,
      "skipLibCheck": true,
      "jsx": "react-jsx",
      "allowSyntheticDefaultImports": true,
      "forceConsistentCasingInFileNames": true,
      "allowJs": true,
      "types": [
        "bun-types" // add Bun global
      ],
      ${!isP5 && '"typeRoots": ["./typings"]'}
    }
  }
  `;
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

// returns the template folder name after prompting the user to choose a template
async function chooseTemplate() {
  const choices = ["p5 + TypeScript", "HTML canvas + TypeScript (plain)"];
  const result = await inquirer.prompt({
    name: "template",
    type: "list",
    message: "Choose a template:",
    choices,
    default: () => {
      return choices[1];
    },
  });

  if (result.template === choices[0]) {
    return "p5template";
  }
  if (result.template === choices[1]) {
    return "template";
  }
  return "template";
}

async function userChoseNpm() {
  const choices = ["bun", "npm"];
  const result = await inquirer.prompt({
    name: "packageManager",
    type: "list",
    message: "Choose a package manager:",
    choices,
    default: () => {
      return choices[0];
    },
  });

  // if the user chose bun, return false
  if (result.packageManager === choices[0]) {
    return false;
  }
  // if the user chose npm, return true
  if (result.packageManager === choices[1]) {
    return true;
  }
  return false;
}

async function main() {
  await gradientText("Canvas Boilerplate");
  const dirName = await getDirName();

  const dirNameIsValid = await checkFolderNameIsValid(dirName);
  if (!dirNameIsValid) {
    process.exit(1);
  }

  const templateFolderName = await chooseTemplate();
  const isP5 = templateFolderName === "p5template";
  const templateFolderPath = path.join(currentDir, "..", templateFolderName);
  const isNpm = await userChoseNpm();
  // console.info(templateFolderPath);
  const spinner = createSpinner("Scaffolding files...").start();
  child_process.execSync(`cp -r ${templateFolderPath}/* ${dirName}`);

  const packageJSONContent = generatePackageJSON(
    dirName,
    templateFolderName === "p5template",
    isNpm
  );

  const tsConfigContent = generateTsConfig(isNpm, isP5);

  await fsPromise.writeFile(
    path.join(dirName, "tsconfig.json"),
    tsConfigContent
  );

  await fsPromise.writeFile(
    path.join(dirName, "package.json"),
    packageJSONContent
  );

  spinner.success({
    text: `files created.
  1. cd into the ${dirName} directory.
  2. Run \`${isNpm ? "npm" : "bun"} install\` to get started.
  3. Run \`${isNpm ? "npm" : "bun"} run build\` to build the project.
  4. Start a live server on the index.html in the dist to see the canvas in action.`,
  });
  process.chdir(dirName);
}

main();
