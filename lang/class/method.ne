@lexer lex

@include "../util/value.ne"

methods -> %cw methodargs ":" %s returntypes %s "{" methodbody:+ "}" {% (d) => { return { type: "method", name: d[0].value, public: false, returns: d[4], body: d[7] } } %}
    | "public" %s %cw methodargs ":" %s:? returntypes %s "{" methodbody:+ "}" {% (d) => { return { type: "method", name: d[2].value, public: true, returns: d[6], body: d[9] } } %}

injectMethods -> %cw methodargs ":" %s returntypes %s "#" "#" "{" methodbody:+ "}" "#" "#" {% (d) => { return { type: "method", name: d[0].value, public: false, returns: d[4], body: d[11] } } %}
    | "public" %s %cw methodargs ":" %s:? returntypes %s "#" "#" "{" methodbody:+ "}" "#" "#" {% (d) => { return { type: "method", name: d[2].value, public: true, returns: d[6], body: d[11] } } %}

methodbody -> call {%id%}
    | %nl {%idval%}
    | %s {%idval%}

call -> %cw "(" values (%s:? "," %s:? values):* ")" ";":? {% (d) => { return { type: "call", calls: [d[0].value], values: [...d[2], ...d[3]]} } %}

methodargs -> "(" ")"

methodconstructor -> %cw methodargs "{" methodbody:+ "}" {% (d) => { return { type: "constructor", name: d[0].value, body: d[3] } } %}
