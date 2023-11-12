# My learning

## Setup

### Installing dependencies

THese are common dependencies to use when creating a CLI tool

1. `npm install @types/node typescript --save-dev`
2. `npm i chalk chalk-animation figlet gradient-string inquirer nanospinner commander yargs`
3. `npm i @types/chalk-animation @types/figlet @types/gradient-string @types/inquirer --save-dev`

### typescript setup

We need to make certain changes to the `tsconfig.json` to get ready for npm cli development:

```json
{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "target": "ES6",
    "module": "ESNext",
    "sourceMap": true,
    "esModuleInterop": true,
    "moduleResolution": "Node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

- `target` : must make this es6
- `module` : when set to `commonJS`, you can only use esm compatible modules. If you want to use es6 module syntax, set this to `ESNext` and set `"type": "module"` in `package.json`
- `moduleResolution` : set to `Node` to use node module resolution. Required.
- `rootDir` : set to `src` to make sure that the source files are in the `src` directory
- `outDir` : set to `dist` to make sure that the compiled files are in the `dist` directory
- `include` : the glob path to include for searching for typescript compilation candidates. Set this to all the ts files in the `src` directory
- `exclude` : the glob path to exclude for searching for typescript compilation candidates. Set this to `node_modules` so that we don't compile the node modules

## Command line tools

### Inquirer

Inquirer is a package that lets you choose CLI options and type in input. This is honestly a better way of working with command line arguments than something like yargs or `process.argv`.

Import it like so:

```ts
import inquirer from "inquirer";
```

#### `inquirer.prompt()` method

The `inquirer.prompt(options)` method handles user input, user choice, and etc.

In the example below, it returns whatever the user typed. Here are the properties of the options you can pass in:

- `name` : the name of the input. The value of this is the key that the user input will be stored in.
  - For example, if you set `name: "dirName"` and the method returns a result object, you can get the user input from `result.dirName`.
- `type` : the type of input. Can be `input`, `confirm`, `list`, `rawlist`, `expand`, `checkbox`, `password`, `editor`
- `message` : the prompt message to display to the user
- `default` : the default value to use if the user doesn't type anything

```ts
const result = await inquirer.prompt({
  name: "dirName",
  type: "input",
  message: "Enter the name of the directory:",
  default: () => {
    return "canvas-project";
  },
});

result.dirName; // result stored on whatever you specify the name as
```

### Nanospinner

The nanospinner library offers a cool looking spinner utility to show that an operation is loading. Here is how you use it:

```ts
import { createSpinner } from "nanospinner";

const spinner = createSpinner("Loading...");
// show loading spinner with instantiated message
spinner.start();

// show x mark with specified message
spinner.error({
  text: "Directory already exists",
});

// show check mark with specified message
spinner.success({
  text: "Directory created successfully",
});
```

- `createSpinner(message)` : creates a spinner with the specified message. Returns a `spinner` object
- `spinner.start()` : starts the spinner, showing loading state
- `spinner.error({ text : string})` : shows an x mark with the specified message. stops loading state
- `spinner.success({ text : string })` : shows a check mark with the specified message and stops loading state

### Figlet

The `figlet` module makes big words in the command line using ascii art and looks cool. Try the things below:

```javascript
console.log(figlet.textSync("Hello World!"));
```

```typescript
import figlet from "figlet";
import gradient from "gradient-string";
const program = new Command();

// makes big figlet rainbow text
function gradientText(text: string) {
  return new Promise((resolve, reject) => {
    figlet(text, (err, data) => {
      console.log(gradient.pastel.multiline(data));
      resolve(data);
    });
  });
}
```

## Commander

```typescript
// 1. import it
import { Command } from "commander";

// 2. instantiate it
const program = new Command();

async function mainModule() {
  program
    .version("0.0.1", "-v, --version", "output the current version")
    .description("A CLI for creating canvas projects")
    .name("commander-practice");

  program
    .command("create")
    .description("create a new project")
    .argument("<username>", "name of the user")
    .option("-n, --name <name>", "name of the project", "default-project-name")
    .option("-p5, --p5", "use p5.js")
    .option("-f <FILES...>, --files <FILES...>", "use specified files files")
    .action(async (username, options) => {
      console.log(username);
      console.log(options.name);
    });

  program.parse(process.argv);
}

mainModule();
```
