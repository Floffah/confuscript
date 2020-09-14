import {Grammar, Parser} from "nearley";
import {readFileSync} from "fs";

export default class Actioniser {
    parsed: string[];
    parser: Parser;

    constructor(grammar: Grammar) {
        this.parser = new Parser(grammar);
    }

    start(_initpath: string) {
        this.parsed = readFileSync(_initpath, "utf8").split(/\r\n/g);
        this.parser.feed(this.parsed.join("\n"));
        // for(let chunk of this.parsed) {
        //     this.parser.feed(chunk);
        // }
        console.log(this.parser.finish());
    }
}
