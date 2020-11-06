import {IFileRootData} from "../action/interface";

const chalk = require('chalk');

export default class Runner {
    actionised: { [key: string]: IFileRootData }

    constructor(actionised: { [key: string]: IFileRootData }) {
        this.actionised = actionised;
        console.log(chalk`\n{bold ----- Runner Log -----}`);
    }

    start(path: string) {
        let main: IFileRootData = this.actionised[path];
        let mainm = main.classes[path.split(/[\/\\]/)[path.split(/[\/\\]/).length - 1].replace(".co", "")].methods["main"];

        for(let method of mainm) {
            if(!("run" in method)) {
                for(let call of method.body) {
                    if("calls" in call) {
                        let link = call.calls[0];
                        let linked: IFileRootData = this.actionised[link.link];
                        let linkclass = linked.classes[link.object.name];
                    }
                }
            }
        }

        console.log(chalk`{bold --- Runner Log End ---}`);
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
        console.log(chalk`{bold --- Runner Log End ---}`);
        process.exit(1);
    }
}
