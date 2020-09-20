import 'source-map-support/register'
import {Grammar, Parser} from "nearley";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "fs";
import {resolve, sep} from "path";
import RootClass from "./RootClass";
import {IFileRootData, IImport, IPlainImport, IPlainRootClass} from "./interface";
import globals from "../outglobal";

const chalk = require('chalk');

export default class Actioniser {
    grammar: Grammar;
    options: IActioniserOptions;

    filedata: Map<string, IFileRootData> = new Map<string, IFileRootData>();

    constructor(grammar: Grammar, opts: IActioniserOptions) {
        console.log(chalk`{bold ----- Actioniser Log -----}`);

        this.grammar = grammar;
        this.options = opts;
    }

    start(path: string, isGlobal?: boolean) {
        this.info(`Parsing ${path}`);
        if (!this.filedata.has(path)) {
            let read;
            let parser = new Parser(this.grammar);
            if (!isGlobal && !path.startsWith("globals")) {
                read = readFileSync(process.cwd() + sep + path, "utf8");
            } else /*if (isGlobal && path.startsWith("globals"))*/ {
                read = readFileSync(resolve(__dirname, "../../src", path), "utf8");
            }
            parser.feed(read);
            let parsed: (IPlainRootClass | string)[] = parser.finish()[0];
            this.writeParsed(path, parsed);
            this.filedata.set(path, this.fileroot(parsed, path));
            return;
        }
    }

    writeParsed(path: string, parsed: (IPlainRootClass | string)[]) {
        mkdirSync(resolve(this.options.projectroot, "dist/parsed"), {recursive: true});
        let paths = resolve(this.options.projectroot, "dist/parsed", path + ".json").split(sep);
        paths.pop();
        if (!existsSync(paths.join(sep))) {
            mkdirSync(paths.join(sep), {recursive: true});
        }
        writeFileSync(resolve(this.options.projectroot, "dist/parsed", path + ".json"), JSON.stringify(parsed, null, 2));
    }

    fileroot(parsed: (IPlainRootClass | IPlainImport | string)[], file: string) {
        let data: IFileRootData = {
            classes: {},
            imports: [],
            imported: {}
        };

        for (let root of parsed) {
            if (typeof root === "object" && root.type === "rootclass") {
                let rootclass = new RootClass(this, file, () => {
                    return data;
                });
                rootclass.start(root);
                data.classes[rootclass.name] = rootclass.export();
            } else if (typeof root === "object" && root.type === "rootimport") {
                if (!this.find(root.location)) {
                    this.fatal(`Could not find import ${root.location} in project ${this.options.projectroot + sep + "src"}`);
                } else {
                    let idata: IImport = <IImport>this.importinfo(root.location);
                    data.imports.push(root.location);
                    if (idata !== null && "where" in idata && idata.where === "legacyglobal") {
                        for (let imp of idata.symbols) {
                            data.imported[imp.name] = imp;
                        }
                    } else if(idata !== null && "where" in idata && idata.where === "global") {

                    } else {
                        this.fatal(`Could not find import ${root.location}.`);
                    }
                }
            }
        }

        return data;
    }

    find(importloc: string) {
        if (this.indexExists(importloc, globals)) {
            return true;
        } else if (existsSync(resolve(__dirname, "../../src", "globals", importloc.replace(".", sep) + ".co"))) {
            return true;
        } else {
            return false;
        }
    }

    indexExists(location: string, obj: { [key: string]: any }) {
        let toreturn = obj,
            words = location.split(".");

        for (let word of words) {
            if (word in toreturn) {
                toreturn = toreturn[word];
            } else {
                return false;
            }
        }

        return true;
    }

    index(location: string, obj: { [key: string]: any }) {
        let toreturn = obj,
            words = location.split(".");

        for (let word of words) {
            toreturn = toreturn[word];
        }

        return toreturn;
    }

    importinfo(importloc: string): IImport | null {
        if (existsSync(resolve(this.options.projectroot + "src", importloc.replace(".", sep) + ".co"))) {
            this.start("src" + sep + importloc.replace(".", sep) + ".co");
            return {
                where: "file",
                file: "src" + sep + importloc.replace(".", sep) + ".co"
            }
        } else if (existsSync(resolve(__dirname, "../../src", "globals", importloc.replace(".", sep) + ".co"))) {
            this.start("globals" + sep + importloc.replace(".", sep) + ".co", true);
            return {
                where: "global",
                file: resolve(__dirname, "../", "globals", importloc.replace(".", sep) + ".co")
            }
        } else return null;/*if (this.indexExists(importloc, globals) && typeof this.index(importloc, globals) === "object") {
             let symbols: IImportSymbol[] = [];
             for (let s of Object.keys(this.index(importloc, globals))) {
                 let symbol = this.index(importloc + "." + s, globals);
                 if (typeof symbol === "function") {
                     let sym = symbol("import");
                     if (sym.type === "method") {
                         symbols.push({type: "method", loc: importloc, name: s});
                     }
                 }
             }
             return {
                 where: "legacyglobal",
                 location: importloc,
                 symbols: symbols
             };
         } else*/
    }

    export() {
        let toreturn: { [key: string]: IFileRootData } = {}

        for (let [file, value] of Array.from(this.filedata.entries())) {
            toreturn[file] = value;
        }

        this.info("Actioniser done.");
        console.log(chalk`{bold --- Actioniser Log End ---}`);
        return toreturn;
    }

    info(message: string) {
        console.log(chalk`{green !} ${message}`);
    }

    warn(message: string) {
        console.log(chalk`{yellow !} ${message}`);
    }

    fatal(message: string) {
        console.log(chalk`{red !} ${message}`);
        console.log(chalk`{red !} {bold Fatal. Exiting...}`);
        console.log(chalk`{bold --- Actioniser Log End ---}`);
        process.exit(1);
    }
}

interface IActioniserOptions {
    projectroot: string
}
