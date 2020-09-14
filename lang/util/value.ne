@include "./marks.ne"

@lexer lex

@{%
    const valueslex = {
        ambiguous: "any",
        string: "string"
    }
%}

returntypes -> "any" {% (d) => { return { type: "type", is: "any" } } %}
    | "string" {% (d) => { return { type: "type", is: "string" } } %}

types -> "any" {% (d) => { return { type: "type", is: "any" } } %}
    | "string" {% (d) => { return { type: "type", is: "string" } } %}

values -> stringmark %cwn stringmark {% (d) => { return { type: "string", value: d[1].value } } %}
