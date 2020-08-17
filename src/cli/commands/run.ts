import {resolve} from "path";
import {existsSync, mkdirSync} from "fs";
import searchdir from "../../lib/files/searchdir";
import {ChildProcess, exec} from "child_process";
import cmds from "../../lib/cmds";
import {platform} from "os";

const opn = require('opn');
const chalk = require('chalk');

export default function checks(opts: any) {
    if((opts.grammar || !existsSync(resolve(__dirname, '../../../lang/o/grammar.js')) || searchdir(resolve(__dirname, '../../../lang'), 'ne', resolve(__dirname, '../../../lang/o/grammar.js'))) && !opts.railroad) {
        grammar(opts);
    } else {
        console.log(chalk`{yellow ! } {bold Not compiling Nearley grammar as there is nothing to update or an option forced this to be disabled.}`);
        run(opts);
    }
}

function grammar(opts: any) {
    if(!existsSync(resolve(__dirname, '../../../lang/o/'))) {
        mkdirSync(resolve(__dirname, '../../../lang/o/'));
    }

    // @ts-ignore
    let nelog = console.draft(chalk`{yellow ! } {bold Compiling nearley grammar. This shouldn't take too long.}`),
        necmd:ChildProcess = exec(`${cmds.npx} nearleyc lang/lang.ne -o lang/o/grammar.js`, {
            cwd: resolve(__dirname, "../../../"),
            // @ts-ignore
            stdio: 'pipe'
        });

    necmd.on('close', code => {
        if(code === 0) {
            nelog(chalk`{green ✓ } {bold Nearley grammar compilation done!}`);
            run(opts);
        } else {
            nelog(chalk`{red ⨉ } {bold Nearley grammar compilation failed with code ${code}. Exiting...}`);
            process.exit(1);
        }
    });
}

function run(opts: any) {
    if(opts.railroad) {
        railroad();
        return;
    }
}

function railroad() {
    // @ts-ignore
    let nelog = console.draft(chalk`{yellow ! } {bold Generating railroad diagrams. This shouldn't take too long.}`),
        necmd:ChildProcess = exec(`${cmds.npx} nearley-railroad lang/lang.ne -o lang/o/grammar.html`, {
            cwd: resolve(__dirname, "../../../"),
            // @ts-ignore
            stdio: 'pipe'
        });

    necmd.on('close', code => {
        if(code === 0) {
            nelog(chalk`{green ✓ } {bold Railroad diagram generation completed!} file: file://${resolve(__dirname, "../../../lang/o/grammar.html").replace(/\\/g, "\/")}`);
            if(platform() === "win32" || platform() === "darwin") {
                opn(`file://${resolve(__dirname, "../../../lang/o/grammar.html").replace(/\\\\/g, "\\/")}`);
            }
        } else {
            nelog(chalk`{red ⨉ } {bold Railroad diagram generation failed with code ${code}. Exiting...}`);
            process.exit(1);
        }
    });
}
