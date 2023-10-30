#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var figlet_1 = require("figlet");
var inquirer_1 = require("inquirer");
var fs_1 = require("fs");
var promises_1 = require("fs/promises");
var nanospinner_1 = require("nanospinner");
var path_1 = require("path");
var child_process_1 = require("child_process");
var url_1 = require("url");
var gradient_string_1 = require("gradient-string");
function gradientText(text) {
    return new Promise(function (resolve, reject) {
        (0, figlet_1.default)(text, function (err, data) {
            console.log(gradient_string_1.default.pastel.multiline(data));
            resolve(data);
        });
    });
}
var currentDir = path_1.default.dirname((0, url_1.fileURLToPath)(import.meta.url));
// console.log(figlet.textSync("Canvas Boilerplate"));
function generatePackageJSON(dirName, isP5, isNpm) {
    if (isP5) {
        return "{\n      \"name\": \"".concat(dirName, "\",\n      \"module\": \"src/index.ts\",\n      \"type\": \"module\",\n      \"devDependencies\": {\n        \"@types/p5\": \"^1.7.1\"").concat(!isNpm ? "," : "", "\n        ").concat(!isNpm ? "\"bun-types\": \"latest\"" : "", "\n      },\n      \"peerDependencies\": {\n        \"typescript\": \"^5.0.0\"\n      },\n      \"dependencies\": {\n        \"p5\": \"^1.8.0\"\n      }, \n      \"scripts\": {\n        \"build\": \"").concat(isNpm
            ? "tsc -w"
            : "bun build --minify --watch --outdir dist src/index.ts", "\"\n      }\n    }");
    }
    return "{\n        \"name\": \"".concat(dirName, "\",\n        \"module\": \"src/index.ts\",\n        \"type\": \"module\",\n        \"devDependencies\": {\n          ").concat(!isNpm ? "\"bun-types\": \"latest\"" : "", "\n        },\n        \"peerDependencies\": {\n          \"typescript\": \"^5.0.0\"\n        },\n        \"typings\": \"src/types.d.ts\",\n        \"scripts\": {\n          \"build\": \"").concat(isNpm
        ? "tsc -w"
        : "bun build --minify --watch --outdir dist src/index.ts", "\"\n        }\n      }");
}
function generateTsConfig(isNpm) {
    if (isNpm) {
        return "{\n      \"compilerOptions\": {\n        \"target\": \"es2016\",\n        \"module\": \"ESNext\",\n        \"rootDir\": \"./src\",\n        \"outDir\": \"./dist\",\n        \"esModuleInterop\": true,\n        \"strict\": true,\n        \"skipLibCheck\": true\n      },\n      \"include\": [\"./src/**/*\"],\n      \"exclude\": [\"node_modules\"]\n    }";
    }
    return "{\n    \"compilerOptions\": {\n      \"lib\": [\"ESNext\"],\n      \"module\": \"esnext\",\n      \"target\": \"esnext\",\n      \"moduleResolution\": \"bundler\",\n      \"moduleDetection\": \"force\",\n      \"allowImportingTsExtensions\": true,\n      \"noEmit\": true,\n      \"composite\": true,\n      \"strict\": true,\n      \"downlevelIteration\": true,\n      \"skipLibCheck\": true,\n      \"jsx\": \"react-jsx\",\n      \"allowSyntheticDefaultImports\": true,\n      \"forceConsistentCasingInFileNames\": true,\n      \"allowJs\": true,\n      \"types\": [\n        \"bun-types\" // add Bun global\n      ]\n    }\n  }\n  ";
}
// program.version("0.0.1");
function getDirName() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt({
                        name: "dirName",
                        type: "input",
                        message: "Enter the name of the directory:",
                        default: function () {
                            return "canvas-project";
                        },
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.dirName];
            }
        });
    });
}
function checkFolderNameIsValid(dirName) {
    return __awaiter(this, void 0, void 0, function () {
        var spinner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner = (0, nanospinner_1.createSpinner)("Checking if directory name is okay...").start();
                    if (!fs_1.default.existsSync(dirName)) return [3 /*break*/, 1];
                    spinner.error({
                        text: "Directory already exists",
                    });
                    return [2 /*return*/, false];
                case 1: return [4 /*yield*/, promises_1.default.mkdir(dirName)];
                case 2:
                    _a.sent();
                    spinner.success({
                        text: "Directory created",
                    });
                    return [2 /*return*/, true];
            }
        });
    });
}
// returns the template folder name after prompting the user to choose a template
function chooseTemplate() {
    return __awaiter(this, void 0, void 0, function () {
        var choices, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    choices = ["p5 + TypeScript", "HTML canvas + TypeScript (plain)"];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            name: "template",
                            type: "list",
                            message: "Choose a template:",
                            choices: choices,
                            default: function () {
                                return choices[1];
                            },
                        })];
                case 1:
                    result = _a.sent();
                    if (result.template === choices[0]) {
                        return [2 /*return*/, "p5template"];
                    }
                    if (result.template === choices[1]) {
                        return [2 /*return*/, "template"];
                    }
                    return [2 /*return*/, "template"];
            }
        });
    });
}
function userChoseNpm() {
    return __awaiter(this, void 0, void 0, function () {
        var choices, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    choices = ["bun", "npm"];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            name: "packageManager",
                            type: "list",
                            message: "Choose a package manager:",
                            choices: choices,
                            default: function () {
                                return choices[0];
                            },
                        })];
                case 1:
                    result = _a.sent();
                    // if the user chose bun, return false
                    if (result.packageManager === choices[0]) {
                        return [2 /*return*/, false];
                    }
                    // if the user chose npm, return true
                    if (result.packageManager === choices[1]) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var dirName, dirNameIsValid, templateFolderName, templateFolderPath, isNpm, spinner, packageJSONContent, tsConfigContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gradientText("Canvas Boilerplate")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getDirName()];
                case 2:
                    dirName = _a.sent();
                    return [4 /*yield*/, checkFolderNameIsValid(dirName)];
                case 3:
                    dirNameIsValid = _a.sent();
                    if (!dirNameIsValid) {
                        process.exit(1);
                    }
                    return [4 /*yield*/, chooseTemplate()];
                case 4:
                    templateFolderName = _a.sent();
                    templateFolderPath = path_1.default.join(currentDir, "..", templateFolderName);
                    return [4 /*yield*/, userChoseNpm()];
                case 5:
                    isNpm = _a.sent();
                    spinner = (0, nanospinner_1.createSpinner)("Scaffolding files...").start();
                    child_process_1.default.execSync("cp -r ".concat(templateFolderPath, "/* ").concat(dirName));
                    packageJSONContent = generatePackageJSON(dirName, templateFolderName === "p5template", isNpm);
                    tsConfigContent = generateTsConfig(isNpm);
                    return [4 /*yield*/, promises_1.default.writeFile(path_1.default.join(dirName, "tsconfig.json"), tsConfigContent)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, promises_1.default.writeFile(path_1.default.join(dirName, "package.json"), packageJSONContent)];
                case 7:
                    _a.sent();
                    spinner.success({
                        text: "files created.\n  1. cd into the ".concat(dirName, " directory.\n  2. Run `").concat(isNpm ? "npm" : "bun", " install` to get started.\n  3. Run `").concat(isNpm ? "npm" : "bun", " run build` to build the project.\n  4. Start a live server on the index.html in the dist to see the canvas in action."),
                    });
                    process.chdir(dirName);
                    return [2 /*return*/];
            }
        });
    });
}
main();
