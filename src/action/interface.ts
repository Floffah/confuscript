import {IVarAccess} from "./Call";

//file
export interface IFileRootData {
    classes: {[key: string]:IRootClass},
    imports: string[],
    link: {[key: string]: string}
}


//rootclass
export interface IPlainRootClass {
    type: "rootclass",
    name: string,
    body: (string|IPlainMethod|IPlainInject)[],
    public: boolean
}

export interface IRootClass {
    public: boolean,
    methods: {[key:string]: (IMethod|IInject)[]},
}


//import
export interface IPlainImport {
    type: "rootimport",
    location: string
}

export interface IImportSymbol {
    type: "method",
    loc: string,
    name: string,
}

export interface IBaseImport {
    where: "file"|"global"|"legacyglobal",
}

export interface IGlobalImport extends IBaseImport {
    where: "global",
    file: string
}

export interface IFileImport extends IBaseImport {
    where: "file",
    file: string
}

export type IImport = IGlobalImport | IFileImport;


//method
export interface IPlainMethod {
    type: "method",
    public: boolean,
    returns: {type: "type", is:string},
    body: (string|IPlainCall)[],
    name: string
}

export interface IMethod {
    public: boolean,
    returns: {type: string, is:string},
    body: (ICall)[]
}


//call
export interface IPlainCall {
    type: "call",
    calls: string[],
    values: IPlainValue[]
}

export interface ICall {
    calls: (IVarAccess)[]
}


//inject
export interface IPlainInject {
    type: "inject",
    name: string,
    public: boolean,
    returns: {
        type: "type",
        is: string
    }
    body: (string|IInjected)[]
}

export interface IInject {
    public: boolean,
    returns: {type: "type", is:string},
    run: (string|{var: string})[],
    node: (string|{var: string})[],
    java: (string|{var: string})[]
}

export interface IInjected {
    type: "runinject"|"nodeinject"|"javainject",
    value: (string|{type: "injectvar", var: string})[]
}


//value
export interface IPlainValue {
    type: "string",
    value: any
}
