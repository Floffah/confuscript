import {ICall} from "../action/interface";
import {buildTypings} from "../lib/code/type";

const globals: recObj = {
    confused: {
        logging: {
            Log(_call: (ICall|"import")) {
                return {
                    type: "method",
                    typing: buildTypings("Log", [{message: "string"}]),
                    run(args) {
                        console.log(...args);
                    },
                    compile(args) {
                        return {
                            node: `console.log(${args.join(", ")})`,
                            java: {
                                imports: [],
                                value: `System.out.printLn(${args.join(", ")})`
                            }
                        }
                    }
                }
            }
        }
    }
}
export default globals;

export interface recObj {
    [key: string]: globalType | recObj
}

export type globalType = (call: ICall|"import") => {
    type: "method",
    typing: {
        name: string,
        args: {
            [key: string]: string
        }[]
    },
    run: (args: { type: string, value: string }[]) => void,
    compile: (args: { type: string, value: string }[]) => {
        node: string | {
            imports: {
                var: string,
                loc: string
            }[],
            value: string
        },
        java: {
            imports: string[],
            value: string
        }
    }

}
