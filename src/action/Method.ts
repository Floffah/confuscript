import {IPlainMethod, IMethod} from "./interface";
import Actioniser from "./Actioniser";
import RootClass from "./RootClass";
import Call from "./Call";

export default class Method {
    actioniser: Actioniser;
    rclass: RootClass;

    name: string;
    data: IMethod = <IMethod>{};

    constructor(actioniser: Actioniser, rclass: RootClass) {
        this.actioniser = actioniser;
        this.rclass = rclass;
    }


    start(info: IPlainMethod) {
        this.name = info.name;
        this.data.public = info.public;
        this.data.returns = info.returns;
        this.data.body = [];
        for(let thing of info.body) {
            if(typeof thing === "object") {
                if(thing.type === "call") {
                    let call = new Call(this.actioniser, this);
                    call.start(thing);
                    this.data.body.push(call.export());
                }
            }
        }
    }

    export() {
        return this.data;
    }

}
