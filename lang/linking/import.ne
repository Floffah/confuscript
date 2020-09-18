@include "../util/marks.ne"

@lexer lex

import -> "import" %s stringmark (%w {%idval%}|%cw {%idval%}|"." {%idval%}|"#" {%idval%}):+ stringmark {% (d) => { return { type: "rootimport", location: d[3].join("") } } %}
