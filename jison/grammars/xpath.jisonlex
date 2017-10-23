WhiteSpace          (\s+)
Digit               [0-9]
Letter              [A-Za-z]
NameStartChar       [A-Za-z_]
NameTrailChar       [A-Za-z0-9._-]
NCName              [A-Za-z_][A-Za-z0-9._-]*
QName               [A-Za-z_][A-Za-z0-9._-]*(":"[A-Za-z_][A-Za-z0-9._-]*)?

%s INITIAL OP_CONTEXT VAL_CONTEXT
      
%%

<*>{WhiteSpace}                         /* ignore whitespace */ 

<*>"node"/({WhiteSpace}?"(")                     { return "NODETYPE_NODE"; }
<*>"text"/({WhiteSpace}?"(")                     { return "NODETYPE_TEXT"; }

<*>"comment"/({WhiteSpace}?"(")                  { return "NODETYPE_COMMENT"; }
<*>"processing-instruction"/({WhiteSpace}?"(")   { return "NODETYPE_PROCINSTR"; }

<*>"$"{QName}                                      { return "VAR"; }

<VAL_CONTEXT,INITIAL>{NCName}":*"  { return "NSWILDCARD"; }
<VAL_CONTEXT,INITIAL>{QName}       { return "QNAME"; } 
<VAL_CONTEXT,INITIAL>"*"           { return "WILDCARD"; }

<OP_CONTEXT>"*"                    { return "MULT"; }
<OP_CONTEXT>("and")                  { return "AND"; }
<OP_CONTEXT>("or")                   { return "OR"; }
<OP_CONTEXT>("div")                  { return "DIV"; }
<OP_CONTEXT>("mod")                  { return "MOD"; }

<*>({Digit}+("."{Digit}*)?|("."{Digit}+))             { return "NUM"; }


<*>"="         { return "EQ"; }
<*>"!="        { return "NEQ"; }
<*>"<="        { return "LTE"; }
<*>"<"         { return "LT"; }
<*>">="        { return "GTE"; }
<*>">"         { return "GT"; }
<*>"+"         { return "PLUS"; }
<*>"-"         { return "MINUS"; }
<*>"|"         { return "UNION"; }
<*>"//"        { return "DBL_SLASH"; }
<*>"/"         { return "SLASH"; }
<*>"["         { return "LBRACK"; }
<*>"]"         { return "RBRACK"; }
<*>"("         { return "LPAREN"; }
<*>")"         { return "RPAREN"; }
<*>".."        { return "DBL_DOT"; }
<*>"."         { return "DOT"; }
<*>"@"         { return "AT"; }
<*>"::"        { return "DBL_COLON"; }
<*>","         { return "COMMA"; }
<*>"#"         { return "HASH"; }


<*>("\""[^"\""]*"\""|'\''[^'\'']*'\'')               { return "STR"; }


<*><<EOF>>                              return 'EOF';




