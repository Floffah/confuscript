@include "./class/rootclass.ne"
@include "./util/value.ne"

@{%
    const moo = require("moo");

    const lex = moo.compile({
        s: /[ \t]+/,
        w: /[a-z]+/,
        cw: /[A-z]+/,
        cwn: /[A-z0-9]+/,
        nl: { match: /\n/, lineBreaks: true },

        ...rootclasslex,
        ...valueslex,

        //common
        stringdouble: /"/,
        stringsingle: /'/,
        openbody: /{$/,
        closebody: /}$/,
        empty: /\(\)$/,
        means: /\:$/,
        broitended: /\;$/,
        pub: "public"
    });

    function undef() {
        return undefined;
    }

    function idpipe(d) {
        return [d[0], ...d[1]];
    }
%}

@lexer lex

@include "./linking/import.ne"

root -> main:+ {%id%}

main -> %nl {%undef%}
    | %w {%undef%}
    | %s {%undef%}
    | import {%id%}
    | rootclass {%id%}
