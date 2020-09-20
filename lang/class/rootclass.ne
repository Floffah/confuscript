@lexer lex

@include "./method.ne"
@include "./inject.ne"

rootclass -> "class" %s %cw %s:? "{" %nl:? classbody:+ %nl:? "}" {% (d) => { return { type: "rootclass", name: d[2].value, body: d[6], public: false } } %}
    | "public" %s "class" %s %cw %s:? "{" %nl:? classbody:+ %nl:? "}" {% (d) => { return { type: "rootclass", name: d[4].value, body: d[8], public: true } } %}

classbody -> methods {%id%}
    | injectMethods {%id%}
    | methodconstructor {%id%}
    | %nl {%idval%}
    | %rnl {%idval%}
    | %s {%idval%}
    | comment {%idval%}
