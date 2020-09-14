@include "../util/marks.ne"

@lexer lex

import -> "import" %s stringmark %w stringmark {% (d) => { return { type: "rootimport", location: d[3].value } } %}
