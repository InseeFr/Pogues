/*
 * This jison grammar file is based off of dimagi/js-xpath grammar file
 * which is itself based on the javarosa grammar file.
 * JISON grammar file
 */

%right OR
%right AND
%left EQ NEQ
%left LT LTE GT GTE
%left PLUS MINUS
%left MULT DIV MOD
%nonassoc UMINUS
%left UNION

%%

xpath_expr:  expr EOF   { return $1; }
    ;


expr:   base_expr                   {  $$ = $1; } /* not necessary as this is the default */
    |   op_expr                     {  $$ = $1; }
    |   path_expr                   {  $$ = $1; }
    |   filter_expr                 {  $$ = $1; }
    |   hashtag_expr                {  $$ = $1; }
    ;

base_expr:  LPAREN expr RPAREN            {  $$ = $1; }
        |   func_call
        |   VAR                           {  $$ = $1; }
        |   literal
        ;

op_expr: expr OR expr               {  $$ = $1; }
    |   expr AND expr               {  $$ = $1; }
    |   expr EQ expr                {  $$ = $1; }
    |   expr NEQ expr               {  $$ = $1; }
    |   expr LT expr                {  $$ = $1; }
    |   expr LTE expr               {  $$ = $1; }
    |   expr GT expr                {  $$ = $1; }
    |   expr GTE expr               {  $$ = $1; }
    |   expr PLUS expr              {  $$ = $1; }
    |   expr MINUS expr             {  $$ = $1; }
    |   expr MULT expr              {  $$ = $1; }
    |   expr DIV expr               {  $$ = $1; }
    |   expr MOD expr               {  $$ = $1; }
    |   MINUS expr %prec UMINUS     {  $$ = $1; }
    |   expr UNION expr             {  $$ = $1; }
    ;

func_call:  QNAME LPAREN arg_list RPAREN   {  $$ = $1; }
        |   QNAME LPAREN RPAREN            {  $$ = $1; }
        ;

arg_list:   arg_list COMMA expr     {  $$ = $1; }
        |   expr                    { $$ = [$1]; }
        ;

path_expr:  loc_path
        |   filter_expr SLASH rel_loc_path          {  $$ = $1; }
        |   filter_expr DBL_SLASH rel_loc_path      {  $$ = $1; }
        |   base_expr SLASH rel_loc_path            {  $$ = $1; }
        |   base_expr DBL_SLASH rel_loc_path        {  $$ = $1; }
        ;

filter_expr:  base_expr predicate     {  $$ = $1; }
        |   filter_expr predicate     {  $$ = $1; }
        ;

hashtag_expr:  HASH QNAME SLASH hashtag_path              {  $$ = $1; }
        |  HASH QNAME                                     {  $$ = $1; }
        ;

hashtag_path: QNAME  {$$ = [$1];}
        |   hashtag_path SLASH QNAME {var path = $1; path.push($3); $$ = path;}
        ;


predicate:   LBRACK expr RBRACK            { $$ = $2; }
        ;


loc_path:   rel_loc_path                    {  $$ = $1; }
        |   SLASH rel_loc_path              {  $$ = $1; }
        |   DBL_SLASH rel_loc_path          {  $$ = $1; }
        |   SLASH                   {  $$ = $1; }
        ;

rel_loc_path: step                        { $$ = [$1];}
        |   rel_loc_path SLASH step       {  $$ = $1; }
        |   rel_loc_path DBL_SLASH step   {  $$ = $1; }
        ;

step:   step_unabbr                 { $$ = $1; }
    |   DOT                         {  $$ = $1; }
    |   DBL_DOT                     {  $$ = $1; }
    ;

step_unabbr:  step_unabbr predicate       {  $$ = $1; }
        |   step_body                { $$ = $1; }
        ;

step_body: node_test                    {  $$ = $1; }
        |   axis_specifier node_test    {  $$ = $1; }
        ;

axis_specifier:  QNAME DBL_COLON           {  $$ = $1; }
        |   AT                  {  $$ = $1; }
        ;

node_test:  QNAME                 {  $$ = $1; }
        |   WILDCARD                {  $$ = $1; }
        |   NSWILDCARD              {  $$ = $1; }
        |   NODETYPE_NODE LPAREN RPAREN     {  $$ = $1; }
        |   NODETYPE_TEXT LPAREN RPAREN     {  $$ = $1; }
        |   NODETYPE_COMMENT LPAREN RPAREN      {  $$ = $1; }
        |   NODETYPE_PROCINSTR LPAREN RPAREN  {  $$ = $1; }
        |   NODETYPE_PROCINSTR LPAREN STR RPAREN  {  $$ = $1; }
        ;

literal: STR                       {  $$ = $1; }
    |   NUM                       {  $$ = $1; }
    ;

