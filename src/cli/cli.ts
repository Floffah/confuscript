import * as program from 'commander';
import init from "./commands/init";

program.version(require('../../package.json').version);

program.command("init")
    .description("Initialize a confuscript workspace")
    .action(init)


program.parse(process.argv);
