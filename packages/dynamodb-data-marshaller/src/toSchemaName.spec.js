"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var toSchemaName_1 = require("./toSchemaName");
var dynamodb_expressions_1 = require("@invisit/dynamodb-expressions");
var testCases = new Map();
var schema = {
    unchanged: { type: 'String' },
    property: {
        type: 'String',
        attributeName: 'attributeName',
    },
    foo: {
        type: 'Document',
        attributeName: 'topLevelFoo',
        members: {
            foo: {
                type: 'String',
                attributeName: 'fizz',
            },
            bar: {
                type: 'String',
                attributeName: 'buzz',
            },
            baz: {
                type: 'String',
                attributeName: 'pop',
            }
        }
    },
    bar: {
        type: 'List',
        attributeName: 'topLevelBar',
        memberType: {
            type: 'Document',
            members: {
                tom: {
                    type: 'String',
                    attributeName: 'jerry'
                },
                bugs: {
                    type: 'String',
                    attributeName: 'daffy'
                },
                itchy: {
                    type: 'List',
                    attributeName: 'scratchy',
                    memberType: {
                        type: 'List',
                        memberType: {
                            type: 'Document',
                            members: {
                                nameToReplace: {
                                    type: 'String',
                                    attributeName: 'replacementName'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    untypedHash: {
        type: 'Hash',
        attributeName: 'terminalType'
    }
};
testCases.set('unchanged', 'unchanged');
testCases.set('property', 'attributeName');
testCases.set('foo.foo', 'topLevelFoo.fizz');
testCases.set('foo.bar', 'topLevelFoo.buzz');
testCases.set('foo.baz', 'topLevelFoo.pop');
testCases.set('bar[11].tom', 'topLevelBar[11].jerry');
testCases.set('bar[21].bugs', 'topLevelBar[21].daffy');
testCases.set('bar[1].itchy[23][2].nameToReplace', 'topLevelBar[1].scratchy[23][2].replacementName');
testCases.set('untypedHash.foo.bar.baz', 'terminalType.foo.bar.baz');
testCases.set('unknownProperty.access[1][2].baz', 'unknownProperty.access[1][2].baz');
describe('toSchemaName', function () {
    var e_1, _a;
    var _loop_1 = function (input, output) {
        it("should convert a path of " + input + " to " + output, function () {
            expect(toSchemaName_1.toSchemaName(input, schema).elements)
                .toEqual(new dynamodb_expressions_1.AttributePath(output).elements);
        });
    };
    try {
        for (var testCases_1 = tslib_1.__values(testCases), testCases_1_1 = testCases_1.next(); !testCases_1_1.done; testCases_1_1 = testCases_1.next()) {
            var _b = tslib_1.__read(testCases_1_1.value, 2), input = _b[0], output = _b[1];
            _loop_1(input, output);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (testCases_1_1 && !testCases_1_1.done && (_a = testCases_1.return)) _a.call(testCases_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
//# sourceMappingURL=toSchemaName.spec.js.map