var Grammar = require('../').Grammar;
var Rule = require('../').Rule;
var Ref = require('../').Ref;
var parse = require('../').parse;
var Terminal = require('../').Terminal;

var test = require('tap').test;

var grammar = Grammar([
    Rule('start', [ Ref('value') ]),
    Rule('value', [ Ref('object') ]),
    Rule('value', [ Ref('array') ]),
    Rule('value', [ Ref('string') ]),
    Rule('value', [ Ref('number') ]),
    Rule('value', [ Ref('boolean') ]),
    Rule('number', [ Ref('digit') ]),
    Rule('number', [ Ref('number'), Ref('digit') ]),
    Rule('digit', [ Terminal.charset(/[\d]/) ]),
    Rule('object', [ Terminal('{'), Ref('pairs'), Terminal('}') ]),
    Rule('pairs', [ Ref('pair') ]),
    Rule('pairs', [ Ref('pair'), Terminal(','), Ref('pairs') ]),
    Rule('pair', [ Ref('string'), Terminal(':'), Ref('value') ]),
    Rule('string', [ Terminal('"'), Ref('inside-string'), Terminal('"') ]),
    Rule('string', [ Terminal('"'), Terminal('"') ]),
    Rule('inside-string', [ Terminal('a'), Ref('inside-string') ]),
    Rule('inside-string', [ Terminal('a') ])
]);

test('parses', function(t) {
    t.ok(parse(grammar, '{"a":"aaaaaaaaa","a":0123}'));
    t.end();
});
