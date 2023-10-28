var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from "commander";
import figlet from "figlet";
import gradient from "gradient-string";
const program = new Command();
function gradientText(text) {
    return new Promise((resolve, reject) => {
        figlet(text, (err, data) => {
            console.log(gradient.pastel.multiline(data));
            resolve(data);
        });
    });
}
// figlet("Testing \n\n\n\nCommand Line tool", (err, data) => {
//   console.log(gradient.pastel.multiline(data));
// });
function mainModule() {
    return __awaiter(this, void 0, void 0, function* () {
        yield gradientText("Testing \n\n\n\nCommand Line tool");
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
            .action((username, options) => __awaiter(this, void 0, void 0, function* () {
            console.log(username);
            console.log(options.name);
        }));
        program.parse(process.argv);
    });
}
mainModule();
//# sourceMappingURL=test.js.map