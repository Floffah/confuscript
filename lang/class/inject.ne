@include "./method.ne"
@include "../util/value.ne"

@lexer lex

injectMethods -> %cw methodargs ":" %s types %s "#" "#" "{" inject:+ "}" "#" "#" {% (d) => { return { type: "inject", name: d[0].value, public: false, returns: d[4], body: d[11] } } %}
    | "public" %s %cw methodargs ":" %s:? types %s "#" "#" "{" injectbody:+ "}" "#" "#" {% (d) => { return { type: "inject", name: d[2].value, public: true, returns: d[6], body: d[11] } } %}

injectbody -> runinject {%id%}
    | nodeinject {%id%}
    | javainject {%id%}
    | %nl {%idval%}
    | %rnl {%idval%}
    | %s {%idval%}

runinject -> "run" %s:? "{" injectmbody:+ "}" {% (d) => { return { type: "runinject", value: d[3] } } %}
nodeinject -> "node" %s:? "{" injectmbody:+ "}" {% (d) => { return { type: "nodeinject", value: d[3] } } %}
javainject -> "java" %s:? "{" injectmbody:+ "}" {% (d) => { return { type: "javainject", value: d[3] } } %}

injectmbody -> injectvar {%id%}
    | literallyAnything {%id%}
