import {ICall, IImportSymbol, IPlainCall} from "./interface";
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
        for (let call of info.calls) {
            if (info.calls[0] === call) {
                let access = this.getAccess(call, "call");
                if (access === false) {
                    this.actioniser.fatal(`Call ${call} of ${this.method.rclass.name}.${this.method.name} is not accessible.`)
                }
                this.data.calls.push(access);
            } else {

            }
        }
    }

    getAccess(name: string, type: "call"): boolean | IVarAccess {
        if (type === "call") {
            let imported: IImportSymbol = this.method.rclass.getdata().imported[name];
            if (!imported) {
                return false;
            }
            if (imported.type !== "method") {
                return false;
            }
        }
        return true;
    }

    export() {
        return this.data;
    }

}

export interface IVarAccess {

}
