import Actioniser from "./Actioniser";
import {IFileRootData, IPlainRootClass, IRootClass} from "./interface";
import Method from "./Method";
import InjectMethod from "./InjectMethod";

export default class RootClass {
    actioniser: Actioniser;
    path: string;
    getdata: () => IFileRootData;

    name: string
    data: IRootClass = <IRootClass>{
        type: "rootclass",
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

        for (let method of info.body) {
            if (typeof method === "object" && method.type === "method") {
                let methodd = new Method(this.actioniser, this);
                methodd.start(method);
                if (!Array.isArray(this.data.methods[methodd.name])) {
                    this.data.methods[methodd.name] = [methodd.export()];
                } else {
                    this.data.methods[methodd.name].push(methodd.export());
                }
            } else if (typeof method === "object" && method.type === "inject") {
                let inject = new InjectMethod(this.actioniser, this);
                inject.start(method);
                if (!Array.isArray(this.data.methods[inject.name])) {
                    this.data.methods[inject.name] = [inject.export()];
                } else {
                    this.data.methods[inject.name].push(inject.export());
                }
            }
        }
    }

    export() {
        return this.data;
    }
}
