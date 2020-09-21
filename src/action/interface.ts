import {IVarAccess} from "./Call";

export interface IPlainRootClass {
    type: "rootclass",
    name: string,
    body: (string|IPlainMethod|IPlainInject)[],
    public: boolean
}

export interface IPlainImport {
    type: "rootimport",
    location: string
}

export interface IPlainMethod {
    type: "method",
    public: boolean,
    returns: {type: "type", is:string},
    body: (string|IPlainCall)[],
    name: string
}

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

export interface IPlainCall {
    type: "call",
    calls: string[],
    values: IPlainValue[]
}

export interface IPlainValue {
    type: "string",
    value: any
}

export interface IRootClass {
    public: boolean,
    methods: {[key:string]: (IMethod|IInject)[]},
}

export interface IBaseImport {
    where: "file"|"global"|"legacyglobal",
}

export interface IImportSymbol {
    type: "method",
    loc: string,
    name: string,
}

export interface IGlobalImport extends IBaseImport {
    where: "global",
    file: string
}

export interface IFileImport extends IBaseImport {
    where: "file",
    file: string
}

export interface ILegacyGlobal extends IBaseImport {
    where: "legacyglobal",
    location: string,
    symbols: IImportSymbol[]
}

export type IImport = IGlobalImport | ILegacyGlobal | IFileImport;

export interface IMethod {
    public: boolean,
    returns: {type: string, is:string},
    body: (ICall)[]
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

export interface ICall {
    calls: (IVarAccess)[]
}

export interface IFileRootData {
    classes: {[key: string]:IRootClass},
    imports: string[],
    imported: {[key: string]: IImportSymbol}
}
