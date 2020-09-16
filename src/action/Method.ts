import {IPlainMethod, IMethod} from "./interface";
import Actioniser from "./Actioniser";

export default class Method {
    actioniser: Actioniser;

    name: string;
    data: IMethod = <IMethod>{};

    constructor(actioniser: Actioniser) {
        this.actioniser = actioniser;
    }


    start(info: IPlainMethod) {
        this.name = info.name;
        this.data.public = info.public;
        this.data.returns = info.returns;
    }

    export() {
        return this.data;
    }

}
