import {Grammar, Parser} from "nearley";
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "fs";
import {resolve, sep} from "path";
import RootClass from "./RootClass";
import {IFileRootData, IPlainRootClass} from "./interface";

export default class Actioniser {
    parser: Parser;
    options: IActioniserOptions;

    filedata: Map<string, IFileRootData> = new Map<string, IFileRootData>();

    constructor(grammar: Grammar, opts: IActioniserOptions) {
        this.parser = new Parser(grammar);
        this.options = opts;
    }

    start(path: string) {
        if (!this.filedata.has(path)) {
            let read = readFileSync(path, "utf8").split(/\r\n/g);
            this.parser.feed(read.join("\n"));
            let parsed: (IPlainRootClass | string)[] = this.parser.finish()[0];
            this.writeParsed(path, parsed);
            this.filedata.set(path, this.fileroot(parsed));
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

    fileroot(parsed: (IPlainRootClass | string)[]) {
        let data: IFileRootData = {
            classes: {}
        };

        for (let root of parsed) {
            if (typeof root === "object" && root.type === "rootclass") {
                let rootclass = new RootClass(this);
                rootclass.start(root);
                data.classes[rootclass.name] = rootclass.export();
            }
        }

        return data;
    }

    export() {
        let toreturn: { [key: string]: IFileRootData } = {}

        for (let [file, value] of Array.from(this.filedata.entries())) {
            toreturn[file] = value;
        }

        return toreturn;
    }
}

interface IActioniserOptions {
    projectroot: string
}
