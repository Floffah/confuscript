import {IInject, IPlainInject} from "./interface";
import Actioniser from "./Actioniser";
import RootClass from "./RootClass";

export default class InjectMethod {
    actioniser: Actioniser;
    rclass: RootClass;

    name: string;
    data: IInject = <IInject>{};

    constructor(actioniser: Actioniser, rclass: RootClass) {
        this.actioniser = actioniser;
        this.rclass = rclass;
    }


    start(info: IPlainInject) {
        this.name = info.name;
        this.data.public = info.public;
        this.data.returns = info.returns;
        this.data.run = [""];
        this.data.node = [""];
        this.data.java = [""];
        for (let thing of info.body) {
            if (typeof thing === "object" && thing.type === "runinject") {
                for (let part of thing.value) {
                    if (typeof part === "string") {
                        this.data.run[this.data.run.length - 1] += part;
                    } else {
                        this.data.run.push({var: part.var});
                        this.data.run.push("");
                    }
                }
            } else if (typeof thing === "object" && thing.type === "nodeinject") {
                for (let part of thing.value) {
                    if (typeof part === "string") {
                        this.data.node[this.data.node.length - 1] += part;
                    } else {
                        this.data.node.push({var: part.var});
                        this.data.node.push("");
                    }
                }
            } else if (typeof thing === "object" && thing.type === "javainject") {
                for (let part of thing.value) {
                    if (typeof part === "string") {
                        this.data.java[this.data.java.length - 1] += part;
                    } else {
                        this.data.java.push({var: part.var});
                        this.data.java.push("");
                    }
                }
            }
        }
    }

    export() {
        return this.data;
    }

}
