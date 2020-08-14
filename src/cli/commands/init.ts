import {createProject} from "../../lib/project/create";
import {existsSync} from "fs";
import {resolve} from "path";

const {prompt} = require('enquirer');

export default function init(opts: Object) {
    let initials:any = {};
    if(existsSync(resolve(process.cwd(), "project.json"))) {
        initials = require(resolve(process.cwd(), "project.json"));
    }
    prompt([
        {
            type: "form",
            name: "info",
            message: "Project information",
            choices: [
                {name: "name", message: "Name", initial: initials.name ? initials.name : "ConfusedApp"},
                {name: "desc", message: "Description", initial: initials.description ? initials.description : "A confused app written in a confused script"},
                {name: "author", message: "Author", initial: initials.author ? initials.author : "Confused Person"},
                {name: "version", message: "Version", initial: initials.version ? initials.version : "0.0.1"},
                {name: "license", message: "License", initial: initials.license ? initials.license : "GPL-3.0"}
            ]
        },
        {
            type: "input",
            name: "entry",
            message: "What is the path of your entry file (inside the src folder)",
            initial: initials.compiler.entry ? initials.compiler.entry : "Main.co"
        },
        {
            type: "confirm",
            name: "library",
            message: "Project is a library?",
            initial: initials.compiler.libraryMode ? initials.compiler.libraryMode : false
        },
        {
            type: "select",
            name: "output",
            message: "What format should the compiler output",
            choices: ["node", "java", "c", "native"],
            initial: initials.compiler.destination ? initials.compiler.destination : undefined
        }
    ]).then((a: any) => {
        createProject(process.cwd(), {
            name: a.info.name,
            desc: a.info.desc,
            author: a.info.author,
            version: a.info.version,
            license: a.info.license,
            library: a.library,
            output: a.output,
            main: a.entry
        });
    });
}

export interface initOpts {
    name: string,
    desc: string,
    author: string,
    version: string,
    license: string,
    main: string,
    library: boolean,
    output: "node"|"java"|"c"|"native"
}
