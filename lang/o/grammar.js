// Generated automatically by nearley, version 2.19.5
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const rootclasslex = {
        class: "class"
    }


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
var grammar = {
    Lexer: lex,
    ParserRules: [
    {"name": "stringmark", "symbols": [(lex.has("stringdouble") ? {type: "stringdouble"} : stringdouble)]},
    {"name": "stringmark", "symbols": [(lex.has("stringsingle") ? {type: "stringsingle"} : stringsingle)]},
    {"name": "import", "symbols": [{"literal":"import"}, (lex.has("s") ? {type: "s"} : s), "stringmark", (lex.has("w") ? {type: "w"} : w), "stringmark"], "postprocess": (d) => { return { type: "rootimport", location: d[3].value } }},
    {"name": "method", "symbols": [{"literal":"hi"}]},
    {"name": "rootclass$ebnf$1", "symbols": [(lex.has("s") ? {type: "s"} : s)], "postprocess": id},
    {"name": "rootclass$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rootclass$ebnf$2", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": id},
    {"name": "rootclass$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rootclass$ebnf$3", "symbols": []},
    {"name": "rootclass$ebnf$3", "symbols": ["rootclass$ebnf$3", "classbody"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "rootclass$ebnf$4", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": id},
    {"name": "rootclass$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "rootclass", "symbols": [{"literal":"class"}, (lex.has("s") ? {type: "s"} : s), (lex.has("cw") ? {type: "cw"} : cw), "rootclass$ebnf$1", {"literal":"{"}, "rootclass$ebnf$2", "rootclass$ebnf$3", "rootclass$ebnf$4", {"literal":"}"}], "postprocess": (d) => { return { type: "rootclass", name: d[2].value, body: d[6] } }},
    {"name": "classbody", "symbols": ["method"], "postprocess": id},
    {"name": "root$ebnf$1", "symbols": []},
    {"name": "root$ebnf$1", "symbols": ["root$ebnf$1", "main"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "root", "symbols": ["root$ebnf$1"], "postprocess": id},
    {"name": "main", "symbols": [(lex.has("nl") ? {type: "nl"} : nl)], "postprocess": undef},
    {"name": "main", "symbols": [(lex.has("w") ? {type: "w"} : w)], "postprocess": undef},
    {"name": "main", "symbols": ["import"], "postprocess": id},
    {"name": "main", "symbols": ["rootclass"], "postprocess": id}
]
  , ParserStart: "root"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
