@include "./linking/import.ne"
@include "./class/rootclass.ne"

@{%
    const moo = require("moo");

    const lex = moo.compile({
        s: /[ \t]+/,
        w: /[a-z]+/,
        cw: /[A-z]+/,
        nl: { match: /\n/, lineBreaks: true },

        ...rootclasslex,

        //common
        stringdouble: /"/,
        stringsingle: /'/,
        openbody: /\{/,
        closebody: /\}/,
    });

    function undef() {
        return undefined;
    }
%}

@lexer lex

root -> main:* {%id%}

main -> %nl {%undef%}
    | %w {%undef%}
    | import {%id%}
    | rootclass {%id%}
