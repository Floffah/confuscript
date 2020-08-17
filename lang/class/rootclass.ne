@include "./method.ne"

@{%
    const rootclasslex = {
        class: "class"
    }
%}

@lexer lex

rootclass -> "class" %s %cw %s:? "{" %nl:? classbody:* %nl:? "}" {% (d) => { return { type: "rootclass", name: d[2].value, body: d[6] } } %}

classbody -> method {%id%}
