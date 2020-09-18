import Actioniser from "./Actioniser";
import {IPlainRootClass, IRootClass} from "./interface";
import Method from "./Method";

export default class RootClass {
    actioniser: Actioniser;

    name: string
    data: IRootClass = <IRootClass>{
        methods: {},
    };

    constructor(actioniser: Actioniser) {
        this.actioniser = actioniser;
    }

    start(info: IPlainRootClass) {
        this.name = info.name;
        this.data.public = info.public;

        for(let method of info.body) {
            if(typeof method === "object" && method.type === "method") {
                let methodd = new Method(this.actioniser, this);
                methodd.start(method);
                if(!Array.isArray(this.data.methods[methodd.name])) {
                    this.data.methods[methodd.name] = [methodd.export()];
                } else {
                    this.data.methods[methodd.name].push(methodd.export());
                }
            }
        }
    }

    export() {
        return this.data;
    }
}
