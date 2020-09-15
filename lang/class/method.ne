@lexer lex

@include "../util/value.ne"

methods -> %cw:+ methodargs ":" %s returntypes %s "{" methodbody:+ "}" {% (d) => { return { type: "method", public: false, returns: d[6], body: d[9] } } %}
    | %pub %s %cw:+ methodargs ":" %s:? returntypes %s "{" methodbody:+ "}" {% (d) => { return { type: "method", public: true, returns: d[7], body: d[10] } } %}

methodbody -> call {%id%}
    | %nl {%undef%}
    | %w {%undef%}
    | %s {%undef%}

call -> %cw "(" values ")" ";":?

methodargs -> "(" ")"
