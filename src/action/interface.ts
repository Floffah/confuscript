export interface IPlainRootClass {
    type: "rootclass",
    name: string,
    body: (string|IPlainMethod)[],
    public: boolean
}

export interface IPlainMethod {
    type: "method",
    public: boolean,
    returns: {type: "type", is:string},
    body: any[],
    name: string
}

export interface IPlainValue {
    type: "string",
    value: any
}

export interface IRootClass {
    public: boolean,
    methods: {[key:string]: IMethod[]}
}

export interface IMethod {
    public: boolean,
    returns: {type: string, is:string}
}

export interface IFileRootData {
    classes: {[key: string]:IRootClass}
}
