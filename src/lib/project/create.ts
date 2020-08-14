import {existsSync, mkdirSync, writeFileSync} from "fs";
import {resolve} from "path";
import {initOpts} from "../../cli/commands/init";
import {capitaliseFirst} from "../typextension/string";

export function createProject(rootpath: string, opts: initOpts) {
    if(!existsSync(resolve(rootpath, "src"))) {
        mkdirSync(resolve(rootpath, "src"));
    }
    writeFileSync(resolve(rootpath, "src", `${opts.main}`), buildMainScript(opts));
    writeFileSync(resolve(rootpath, "project.json"), JSON.stringify({
        name: opts.name,
        description: opts.desc,
        version: opts.version,
        compiler: {
            libraryMode: opts.library,
            destination: opts.output,
            entry: opts.main,
        },
        author: opts.author,
        license: opts.license,
    }, null, 4));
}

export function buildMainScript(opts: initOpts): string {
    return `public class ${capitaliseFirst(opts.main.replace(".co", ""))} {\n    public main():any {\n        Log("Hello world from ${opts.name}");\n    }\n}\n`
}
