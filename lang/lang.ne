@{%
    const moo = require("moo");

    const lex = moo.compile({
        s: /[\ \t]+/,
        cw: /[A-z]+/,
        cwn: /[A-z0-9]+/,
        nl: { match: /\n/, lineBreaks: true },
        rnl: { match: /\r\n/, lineBreaks: true },

        //common
        stringdouble: /"/,
        stringsingle: /'/,

        openbody: /{$/,
        closebody: /}$/,

        means: ":",
        broitended: /\;$/,

        pub: "public",

        opensub: "(",
        closesub: ")",

        //class
        class: "class",

        //values
        ambiguous: "any",
        string: "string",
        nothing: "void",
        comment: "//",

        //random
        dot: ".",
        hash: "#",
        theresMore: ",",
        maybeLiteral: /\#/,
        anysymbol: /[\-\_\=\+\[\{\]\}\:\@\~\<\>\/\?\`\!\£\$\%\^\&\*\9\\\|]+/,

        run: "run",
        node: "node",
        java: "java",
    });

    function undef() {
        return undefined;
    }

    function idpipe(d) {
        return [d[0], ...d[1]];
    }

    function idval(d) {
        return d[0].value;
    }
%}

@lexer lex

@include "./linking/import.ne"
@include "./class/rootclass.ne"
@include "./util/value.ne"

root -> main:+ {%id%}

main -> rootclass {%id%}
    | import {%id%}
    | %nl {%idval%}
    | %s {%idval%}
    | %rnl {%idval%}
    | comment {%idval%}
