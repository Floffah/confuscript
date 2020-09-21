@lexer lex

@include "./marks.ne"

types -> "any" {% (d) => { return { type: "type", is: "any" } } %}
    | "string" {% (d) => { return { type: "type", is: "string" } } %}
    | "void" {% (d) => { return { type: "type", is: "void" } } %}

values -> stringmark anythingReally:+ stringmark {% (d) => { return [{ type: "string", value: d[1].join("") }] } %}

anythingReally -> %cwn {% (d) => {return d[0].value} %}
    | %cw {% (d) => {return d[0].value} %}
    | %s {% (d) => {return d[0].value} %}

anyWordReally -> %cwn {% (d) => {return d[0].value} %}
    | %cw {% (d) => {return d[0].value} %}

literallyAnything -> %cwn {% (d) => {return d[0].value} %}
    | %cw {% (d) => {return d[0].value} %}
    | %anysymbol {% (d) => {return d[0].value} %}
    | %s {% (d) => {return d[0].value} %}
    | %nl {%idval%}
    | %rnl {%idval%}
    | %broitended {%idval%}
    | %dot {%idval%}
    | %opensub {%idval%}
    | %closesub {%idval%}
    | %theresMore {%idval%}
    | stringmark {%idval%}

literallyAnythingButLine -> %cwn {% (d) => {return d[0].value} %}
   | %cw {% (d) => {return d[0].value} %}
   | %anysymbol {% (d) => {return d[0].value} %}
   | %s {% (d) => {return d[0].value} %}
   | %broitended {%idval%}
   | %dot {%idval%}
   | %opensub {%idval%}
   | %closesub {%idval%}
   | %theresMore {%idval%}
   | stringmark {%idval%}

injectvar -> "#" "{" anyWordReally "}" "#" {% (d) => { return { type: "injectvar", var: d[2] } } %}

comment -> "//" literallyAnythingButLine:+ {% (d) => { return d.join("") } %}
