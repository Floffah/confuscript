import Actioniser from "./Actioniser";
import {IFileRootData, IPlainRootClass, IRootClass} from "./interface";
import Method from "./Method";

export default class RootClass {
    actioniser: Actioniser;
    path: string;
    getdata: () => IFileRootData;

    name: string
    data: IRootClass = <IRootClass>{
        methods: {},
    };

    constructor(actioniser: Actioniser, path: string, getdata: () => IFileRootData) {
        this.actioniser = actioniser;
        this.path = path;
        this.getdata = getdata;
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
