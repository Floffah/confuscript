@lexer lex

@include "../util/value.ne"

methods -> %cw methodargs ":" %s types %s "{" methodbody:+ "}" {% (d) => { return { type: "method", name: d[0].value, public: false, returns: d[4], body: d[7] } } %}
    | "public" %s %cw methodargs ":" %s:? types %s "{" methodbody:+ "}" {% (d) => { return { type: "method", name: d[2].value, public: true, returns: d[6], body: d[9] } } %}

methodbody -> call {%id%}
    | %nl {%idval%}
    | %rnl {%idval%}
    | %s {%idval%}
    | comment {%idval%}

call -> %cw callextra:* "(" values (%s:? "," %s:? values):* ")" ";":? {% (d) => { return { type: "call", calls: [d[0].value, ...d[1]], values: [...d[3], ...d[4]]} } %}

callextra -> "." %cw {% (d) => { return d[1].value } %}

methodargs -> "(" methodargbits:? ")" {% (d) => { return d[1] } %}

methodargbits -> methodarg extraargs:* {% (d) => { return [d[0], ...d[1]] } %}

extraargs -> %s:? "," %s:? methodarg {% (d) => { return d[3] } %}

methodarg -> anyWordReally ":" %s:? types {% (d) => { return { type: "methodarg", name: d[0], type: d[3] } } %}

methodconstructor -> %cw methodargs %s:? "{" methodbody:+ "}" {% (d) => { return { type: "constructor", name: d[0].value, body: d[4] } } %}
