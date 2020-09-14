@lexer lex

@{%
    const rootclasslex = {
        class: "class"
    }
%}

@include "./method.ne"

rootclass -> "class" %s %cw %s:? "{" %nl:? classbody:+ %nl:? "}" {% (d) => { return { type: "rootclass", name: d[2].value, body: d[6], public: false } } %}
    | %pub %s "class" %s %cw %s:? "{" %nl:? classbody:+ %nl:? "}" {% (d) => { return { type: "rootclass", name: d[2].value, body: d[6], public: true } } %}

classbody -> methods
    | %nl {%undef%}
    | %w {%undef%}
    | %s {%undef%}
