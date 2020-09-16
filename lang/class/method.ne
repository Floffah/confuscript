@lexer lex

@include "../util/value.ne"

methods -> %cw methodargs ":" %s returntypes %s "{" methodbody:+ "}" {% (d) => { return { type: "method", name: d[0].value, public: false, returns: d[4], body: d[7] } } %}
    | "public" %s %cw methodargs ":" %s:? returntypes %s "{" methodbody:+ "}" {% (d) => { return { type: "method", name: d[2].value, public: true, returns: d[6], body: d[9] } } %}

methodbody -> call {%id%}
    | %nl {%idval%}
    | %s {%idval%}

call -> %cw "(" values ")" ";":? {% (d) => { return { type: "call", calls: [d[0].value], values: d[2] } } %}

methodargs -> "(" ")"
