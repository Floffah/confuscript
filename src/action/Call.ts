import {ICall, IPlainCall} from "./interface";
import Actioniser from "./Actioniser";
import Method from "./Method";

export default class Class {
    actioniser: Actioniser;
    method: Method;

    name: string;
    data: ICall = <ICall>{};

    constructor(actioniser: Actioniser, method: Method) {
        this.actioniser = actioniser;
        this.method = method;
    }


    start(info: IPlainCall) {
        this.data.calls = [];
        let callindex = 0;
        for (let call of info.calls) {
            if (info.calls[0] === call) {
                let access = this.getAccess(call, "call");
                if (access === false) {
                    this.actioniser.fatal(`Call ${call} of ${this.method.rclass.name}.${this.method.name} is not accessible.`)
                }
                this.data.calls.push(call);
            } else {
                let access = this.getAccess(call, "sub", info.calls[callindex - 1]);
                if (!access) {
                    this.actioniser.fatal(`Call ${call} of ${info.calls[callindex - 1]} in ${this.method.rclass.name}.${this.method.name} is not accessible.`)
                }
            }
            callindex++;
        }
    }

    getAccess(name: string, type: "call" | "sub", of?: string): boolean | IVarAccess {
        if (type === "call") {
            let imported = this.method.rclass.getdata().link[name];
            if (!imported) {
                return false;
            }
            let imp = this.actioniser.filedata.get(imported);
            if (imp) {
                return imp.classes[name] !== undefined;
            } else {
                return false;
            }
        } else if(type === "sub") {
            //this.actioniser.info(name + " " + (of ? of : "no"));
            
        }
        return true;
    }

    export() {
        return this.data;
    }

}

export interface IVarAccess {

}
