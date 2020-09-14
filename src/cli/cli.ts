import program from 'commander';
import init from "./commands/init";
import run from "./commands/run";

require('draftlog').into(console);

program.version(require('../../package.json').version);

program.command("init")
    .description("Initialize a confuscript workspace")
    .action(init);

program.command("run")
    .description("Run a confuscript project")
    .option("-g, --grammar", "Force a grammar update")
    .option("-r, --railroad", "Force Nearley to generate railroad diagrams based on the grammar. Note that this currently is not recursive and only generates the entry file.")
    .action(run);


program.parse(process.argv);
