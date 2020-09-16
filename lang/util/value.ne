@lexer lex

@include "./marks.ne"

returntypes -> "any" {% (d) => { return { type: "type", is: "any" } } %}
    | "string" {% (d) => { return { type: "type", is: "string" } } %}

types -> "any" {% (d) => { return { type: "type", is: "any" } } %}
    | "string" {% (d) => { return { type: "type", is: "string" } } %}

values -> stringmark anythingReally:+ stringmark {% (d) => { return [{ type: "string", value: d[1].join("") }] } %}

anythingReally -> %cwn {% (d) => {return d[0].value} %}
    | %cw {% (d) => {return d[0].value} %}
    | %s {% (d) => {return d[0].value} %}
