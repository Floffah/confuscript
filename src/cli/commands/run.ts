import {resolve} from "path";
import {existsSync, mkdirSync} from "fs";
import searchdir from "../../lib/files/searchdir";
import {ChildProcess, exec} from "child_process";
import cmds from "../../lib/cmds";
import Actioniser from "../../action/Actioniser";
import {Grammar} from "nearley";

const chalk = require('chalk');

export default function checks(opts: any) {
    if ((opts.grammar || !existsSync(resolve(__dirname, '../../../lang/o/grammar.js')) || searchdir(resolve(__dirname, '../../../lang'), 'ne', resolve(__dirname, '../../../lang/o/grammar.js')))) {
        grammar(opts);
    } else {
        console.log(chalk`{yellow ! } {bold Not compiling Nearley grammar as there is nothing to update.}`);
        run(opts);
    }
}


function run(opts: any) {
    if (opts.railroad) {
        railroad().then(() => crun(opts));
    } else {
        crun(opts);
    }
}

function crun(_opts:any) {
    let grammar = require(resolve(__dirname, '../../../lang/o/grammar.js')),
        actioniser = new Actioniser(Grammar.fromCompiled(grammar));

    if (!existsSync(resolve(process.cwd(), "project.json"))) {
        throw new Error("project.json file not found");
    }
    let project = require(resolve(process.cwd(), "project.json"));

    actioniser.start(resolve(process.cwd(), "src", project.compiler.entry));
}

function grammar(opts: any) {
    if (!existsSync(resolve(__dirname, '../../../lang/o/'))) {
        mkdirSync(resolve(__dirname, '../../../lang/o/'));
    }

    // @ts-ignore
    let nelog = console.draft(chalk`{yellow ! } {bold Compiling nearley grammar. This shouldn't take too long.}`),
        necmd: ChildProcess = exec(`${cmds.npx} nearleyc lang/lang.ne -o lang/o/grammar.js`, {
            cwd: resolve(__dirname, "../../../"),
            // @ts-ignore
            stdio: 'pipe'
        });

    necmd.on('close', code => {
        if (code === 0) {
            nelog(chalk`{green ✓ } {bold Nearley grammar compilation done!}`);
            run(opts);
        } else {
            nelog(chalk`{red ⨉ } {bold Nearley grammar compilation failed with code ${code}. Exiting...}`);
            process.exit(1);
        }
    });
}

function railroad(): Promise<any> {
    return new Promise((resolve1) => {
        // @ts-ignore
        let nelog = console.draft(chalk`{yellow ! } {bold Generating railroad diagrams. This shouldn't take too long.}`),
            necmd: ChildProcess = exec(`${cmds.npx} nearley-rr lang/o/grammar.js docs/index.html`, {
                cwd: resolve(__dirname, "../../../"),
                // @ts-ignore
                stdio: 'pipe'
            });

        necmd.on('close', code => {
            if (code === 0) {
                nelog(chalk`{green ✓ } {bold Railroad diagram generation completed!} file: file://${resolve(__dirname, "../../../docs/index.html").replace(/\\/g, "\/")}`);
                resolve1();
            } else {
                nelog(chalk`{red ⨉ } {bold Railroad diagram generation failed with code ${code}. Exiting...}`);
                process.exit(1);
            }
        });
    });
}
