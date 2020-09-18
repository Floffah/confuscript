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
        for(let call of info.calls) {
            if(info.calls[0] === call) {
                let access = this.getAccess(call);
                if(access === false) {
                    this.actioniser.fatal(`Call ${call} of ${this.method.rclass.name}.${this.method.name} is not accessible.`)
                }
                this.data.calls.push(access);
            } else {

            }
        }
    }

    getAccess(name: string):boolean|IVarAccess {
        return true;
    }

    export() {
        return this.data;
    }

}

export interface IVarAccess {

}
