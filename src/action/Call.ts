import {ICall, ICallLocation, IPlainCall} from "./interface";
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
        let rootloc = this.locate(info.calls[0])
        if (rootloc === null) {
            this.actioniser.fatal("Could not find object referenced by call " + info.calls[0]);
            return;
        }
        this.data.calls.push(rootloc);
        let clls = [...info.calls]
        clls.pop();
        if (info.calls.length > 1) {
            for (let call of clls) {
                let lastobj = this.data.calls[this.data.calls.length - 1];
                if (lastobj.object.type === "rootclass") {
                    // @ts-ignore typescript is being bonk here i am clearly checking if its not undefined lmao
                    if (this.actioniser.filedata.get(lastobj.link) !== undefined && call in this.actioniser.filedata.get(lastobj.link).classes[lastobj.object.name].methods) {
                        this.data.calls.push({
                            type: "property",
                            link: lastobj.object.name,
                            object: {
                                name: call,
                                type: "method"
                            }
                        })
                    }
                }
            }
        }
    }

    locate(name: string, parent?: ICallLocation | string): null | ICallLocation {
        if (!parent) {
            let link = this.method.rclass.getdata().link[name];
            if (!link) return null;
            let loc = this.actioniser.filedata.get(link)
            if (!loc) return null;
            return {
                type: "noparent",
                link,
                object: {
                    name: name,
                    type: "rootclass"
                }
            }
        }
        return null;
    }

    // legacyStart(info: IPlainCall) {
    //     this.data.calls = [];
    //     let callindex = 0;
    //     for (let call of info.calls) {
    //         if (info.calls[0] === call) {
    //             let access = this.legacyGetAccess(call, "call");
    //             if (access === false) {
    //                 this.actioniser.fatal(`Call ${call} of ${this.method.rclass.name}.${this.method.name} is not accessible.`)
    //             }
    //             this.data.calls.push(call);
    //         } else {
    //             let clls = [...info.calls]
    //             clls.pop()
    //             let access = this.legacyGetAccess(call, "sub", clls);
    //             if (!access) {
    //                 this.actioniser.fatal(`Call ${call} of ${info.calls[callindex - 1]} in ${this.method.rclass.name}.${this.method.name} is not accessible.`)
    //             }
    //         }
    //         callindex++;
    //     }
    // }
    //
    // legacyGetAccess(name: string, type: "call" | "sub", of?: string[]): boolean | IVarAccess {
    //     console.log(name, type, of)
    //     if (type === "call") {
    //         let imported = this.method.rclass.getdata().link[name];
    //         if (!imported) {
    //             return false;
    //         }
    //         let imp = this.actioniser.filedata.get(imported);
    //         if (imp) {
    //             return imp.classes[name] !== undefined;
    //         } else {
    //             return false;
    //         }
    //     } else if(type === "sub") {
    //         //this.actioniser.info(name + " " + (of ? of : "no"));
    //
    //     }
    //     return true;
    // }

    export() {
        return this.data;
    }

}
