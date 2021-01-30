"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marshallKey_1 = require("./marshallKey");
describe('marshallKey', function () {
    var schema = {
        fizz: {
            type: 'String',
            keyType: 'HASH',
            attributeName: 'foo',
        },
        buzz: {
            type: 'Date',
            keyType: 'RANGE',
            indexKeyConfigurations: { bar: 'HASH' },
            attributeName: 'bar',
        },
        pop: {
            type: 'Number',
            indexKeyConfigurations: { foo: 'HASH' }
        },
        notAKey: {
            type: 'Tuple',
            members: [
                { type: 'Boolean' },
                { type: 'String' },
            ]
        },
    };
    var input = {
        fizz: 'baz',
        buzz: new Date(1000),
        pop: 10,
        notAKey: [true, 'quux']
    };
    it('should only marshall key fields', function () {
        expect(marshallKey_1.marshallKey(schema, input))
            .toEqual({
            foo: { S: 'baz' },
            bar: { N: '1' }
        });
    });
    it('should marshall key fields for the correct index if an index name is supplied', function () {
        expect(marshallKey_1.marshallKey(schema, input, 'foo')).toEqual({ pop: { N: '10' } });
        expect(marshallKey_1.marshallKey(schema, input, 'bar')).toEqual({ bar: { N: '1' } });
    });
});
//# sourceMappingURL=marshallKey.spec.js.map