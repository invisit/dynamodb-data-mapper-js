"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unmarshallItem_1 = require("./unmarshallItem");
var dynamodb_auto_marshaller_1 = require("@invisit/dynamodb-auto-marshaller");
describe('unmarshallItem', function () {
    it('should unmarshall fields from their attributeName if provided', function () {
        var _a;
        var attributeName = 'binVal';
        var schema = {
            binary: { type: 'Binary', attributeName: attributeName },
        };
        expect(unmarshallItem_1.unmarshallItem(schema, (_a = {}, _a[attributeName] = { B: new Uint8Array(15) }, _a))).toEqual({ binary: new Uint8Array(15) });
    });
    it('should ignore fields not mentioned in the schema', function () {
        var schema = {
            binary: { type: 'Binary' },
        };
        expect(unmarshallItem_1.unmarshallItem(schema, { str: { S: 'a string' } })).toEqual({});
    });
    it('should ignore fields whose type differs from that in the schema', function () {
        var schema = {
            binary: { type: 'Binary' },
        };
        expect(unmarshallItem_1.unmarshallItem(schema, { binary: { S: 'a string' } })).toEqual({});
    });
    it('should throw if the schema type tag is not recognized', function () {
        var schema = {
            binary: { type: 'Foo' },
        };
        expect(function () { return unmarshallItem_1.unmarshallItem(schema, { binary: { S: 'a string' } }); })
            .toThrow();
    });
    describe('binary fields', function () {
        var schema = {
            binary: { type: 'Binary' },
        };
        it('should unmarshall binary fields', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { binary: { B: new Uint8Array(15) } }))
                .toEqual({ binary: new Uint8Array(15) });
        });
        it('should convert null values to an empty binary value', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { binary: { NULL: true } }))
                .toEqual({ binary: new Uint8Array(0) });
        });
    });
    describe('"any" (untyped) fields', function () {
        it('should marshall of untyped data', function () {
            var schema = { mixedList: { type: 'Any' } };
            var input = {
                mixedList: {
                    L: [
                        { S: 'string' },
                        { N: '123' },
                        { B: new ArrayBuffer(12) },
                        { M: { foo: { S: 'bar' } } },
                        { L: [
                                { S: 'one string' },
                                { N: '234' },
                                { B: new ArrayBuffer(5) },
                            ] },
                    ],
                }
            };
            expect(unmarshallItem_1.unmarshallItem(schema, input)).toEqual({
                mixedList: [
                    'string',
                    new dynamodb_auto_marshaller_1.NumberValue(123),
                    new ArrayBuffer(12),
                    { foo: 'bar' },
                    ['one string', new dynamodb_auto_marshaller_1.NumberValue(234), new ArrayBuffer(5)],
                ],
            });
        });
        it('should marshall of untyped data, considering provided marshalling options', function () {
            var schema = {
                mixedList: {
                    type: 'Any',
                    unwrapNumbers: true
                }
            };
            var input = {
                mixedList: {
                    L: [
                        { S: 'string' },
                        { N: '123' },
                        { B: new ArrayBuffer(12) },
                        { M: { foo: { S: 'bar' } } },
                        { L: [
                                { S: 'one string' },
                                { N: '234' },
                                { B: new ArrayBuffer(5) },
                            ] },
                    ],
                }
            };
            expect(unmarshallItem_1.unmarshallItem(schema, input)).toEqual({
                mixedList: [
                    'string',
                    123,
                    new ArrayBuffer(12),
                    { foo: 'bar' },
                    ['one string', 234, new ArrayBuffer(5)],
                ],
            });
        });
    });
    describe('binary set fields', function () {
        var schema = {
            binSet: { type: 'Set', memberType: 'Binary' },
        };
        it('should unmarshall binary set fields', function () {
            var attrMap = {
                binSet: {
                    BS: [
                        new Uint8Array(1),
                        new Uint8Array(2),
                        new Uint8Array(3),
                    ],
                },
            };
            expect(unmarshallItem_1.unmarshallItem(schema, attrMap)).toEqual({
                binSet: new dynamodb_auto_marshaller_1.BinarySet(attrMap.binSet.BS),
            });
        });
        it('should unmarshall null values as empty binary sets', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { binSet: { NULL: true } }))
                .toEqual({ binSet: new dynamodb_auto_marshaller_1.BinarySet() });
        });
        it('should unmarshall type mismatches as undefined', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { binSet: { BOOL: true } }))
                .toEqual({ binSet: void 0 });
        });
    });
    describe('boolean fields', function () {
        var schema = {
            boolean: { type: 'Boolean' },
        };
        it('should unmarshall boolean fields', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { boolean: { BOOL: false } }))
                .toEqual({ boolean: false });
        });
    });
    describe('collection fields', function () {
        it('should unmarshall untyped collections', function () {
            var schema = { mixedList: { type: 'Collection' } };
            var input = {
                mixedList: {
                    L: [
                        { S: 'string' },
                        { N: '123' },
                        { B: new Uint8Array(12) },
                        { M: { foo: { S: 'bar' } } },
                        { L: [
                                { S: 'one string' },
                                { N: '234' },
                                { B: new Uint8Array(5) },
                            ] },
                    ],
                },
            };
            expect(unmarshallItem_1.unmarshallItem(schema, input)).toEqual({
                mixedList: [
                    'string',
                    new dynamodb_auto_marshaller_1.NumberValue('123'),
                    new Uint8Array(12),
                    { foo: 'bar' },
                    ['one string', new dynamodb_auto_marshaller_1.NumberValue('234'), new Uint8Array(5)],
                ]
            });
        });
    });
    describe('custom fields', function () {
        it('should unmarshall custom fields by invoking the unmarshaller defined in the schema', function () {
            var unmarshall = jest.fn(function () { return 'unmarshalled'; });
            var schema = {
                custom: {
                    type: 'Custom',
                    marshall: jest.fn(),
                    unmarshall: unmarshall,
                },
            };
            expect(unmarshallItem_1.unmarshallItem(schema, { custom: { NULL: true } }))
                .toEqual({ custom: 'unmarshalled' });
            expect(unmarshall.mock.calls.length).toBe(1);
            expect(unmarshall.mock.calls[0]).toEqual([{ NULL: true }]);
        });
    });
    describe('date fields', function () {
        var schema = { aDate: { type: 'Date' } };
        var iso8601 = '2000-01-01T00:00:00Z';
        var epoch = 946684800;
        it('should unmarshall dates into Date objects', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { aDate: { N: epoch.toString(10) } }))
                .toEqual({ aDate: new Date(iso8601) });
        });
        it('should leaves dates undefined if the value at the designated key is not a number', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { aDate: { S: epoch.toString(10) } }))
                .toEqual({});
        });
    });
    describe('document fields', function () {
        it('should recursively unmarshall documents', function () {
            var schema = {
                nested: {
                    type: 'Document',
                    members: {
                        nested: {
                            type: 'Document',
                            members: {
                                scalar: { type: 'String' },
                            },
                        },
                    },
                },
            };
            var input = {
                nested: {
                    M: {
                        nested: {
                            M: {
                                scalar: {
                                    S: 'value',
                                },
                            },
                        },
                    },
                },
            };
            expect(unmarshallItem_1.unmarshallItem(schema, input))
                .toEqual({ nested: { nested: { scalar: 'value' } } });
        });
        it('should invoke the constructor defined in the schema for documents', function () {
            var ctor = /** @class */ (function () {
                function ctor() {
                }
                return ctor;
            }());
            var schema = {
                ctorDoc: {
                    type: 'Document',
                    members: {},
                    valueConstructor: ctor,
                }
            };
            var unmarshalled = unmarshallItem_1.unmarshallItem(schema, { ctorDoc: { M: {} } });
            expect(unmarshalled.ctorDoc).toBeInstanceOf(ctor);
        });
        it('should return undefined for unexpected types', function () {
            var schema = {
                doc: {
                    type: 'Document',
                    members: {},
                }
            };
            expect(unmarshallItem_1.unmarshallItem(schema, { doc: { L: [] } })).toEqual({});
        });
    });
    describe('hash fields', function () {
        it('should unmarshall untyped hashes', function () {
            var schema = { mixedHash: { type: 'Hash' } };
            var input = {
                mixedHash: {
                    M: {
                        foo: { S: 'string' },
                        bar: { N: '123' },
                        baz: { B: new Uint8Array(12) },
                        quux: {
                            BS: [
                                new Uint8Array(1),
                                new Uint8Array(2),
                                new Uint8Array(3),
                            ]
                        },
                        fizz: { M: { foo: { S: 'bar' } } },
                        buzz: {
                            L: [
                                { S: 'one string' },
                                { N: '234' },
                                { B: new Uint8Array(5) },
                            ],
                        },
                        pop: {
                            NS: ['123', '234', '345'],
                        }
                    },
                },
            };
            expect(unmarshallItem_1.unmarshallItem(schema, input)).toEqual({
                mixedHash: {
                    foo: 'string',
                    bar: new dynamodb_auto_marshaller_1.NumberValue('123'),
                    baz: new Uint8Array(12),
                    quux: new dynamodb_auto_marshaller_1.BinarySet([
                        new Uint8Array(1),
                        new Uint8Array(2),
                        new Uint8Array(3),
                    ]),
                    fizz: { foo: 'bar' },
                    buzz: [
                        'one string',
                        new dynamodb_auto_marshaller_1.NumberValue('234'),
                        new Uint8Array(5)
                    ],
                    pop: new dynamodb_auto_marshaller_1.NumberValueSet([
                        new dynamodb_auto_marshaller_1.NumberValue('123'),
                        new dynamodb_auto_marshaller_1.NumberValue('234'),
                        new dynamodb_auto_marshaller_1.NumberValue('345'),
                    ]),
                }
            });
        });
    });
    describe('list fields', function () {
        var schema = {
            list: {
                type: 'List',
                memberType: { type: 'String' },
            },
        };
        it('should unmarshall lists of like items', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, {
                list: {
                    L: [
                        { S: 'a' },
                        { S: 'b' },
                        { S: 'c' },
                    ],
                },
            })).toEqual({ list: ['a', 'b', 'c'] });
        });
        it('should unmarshall non-lists as undefined', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { list: { S: 's' } })).toEqual({});
        });
    });
    describe('map fields', function () {
        var schema = {
            map: {
                type: 'Map',
                memberType: { type: 'String' },
            },
        };
        it('should unmarshall maps of string keys to like items', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, {
                map: {
                    M: {
                        foo: { S: 'bar' },
                        fizz: { S: 'buzz' },
                    },
                },
            }))
                .toEqual({
                map: new Map([
                    ['foo', 'bar'],
                    ['fizz', 'buzz'],
                ])
            });
        });
        it('should unmarshall unexpected types as undefined', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { map: { S: 'foo' } })).toEqual({});
        });
    });
    describe('null fields', function () {
        var schema = {
            'null': { type: 'Null' },
        };
        it('should unmarshall null fields', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { 'null': { NULL: true } }))
                .toEqual({ 'null': null });
        });
        it('should unmarshall unexpected types as undefined', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { 'null': { S: 'b' } })).toEqual({});
        });
    });
    describe('number fields', function () {
        var schema = {
            number: { type: 'Number' },
        };
        it('should unmarshall number fields', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { number: { N: '123' } }))
                .toEqual({ number: 123 });
        });
        it('should unmarshall unexpected types as undefined', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { number: { S: '123' } })).toEqual({});
        });
    });
    describe('number set fields', function () {
        var schema = {
            numSet: { type: 'Set', memberType: 'Number' },
        };
        it('should unmarshall number set fields', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { numSet: { NS: ['1', '2', '3'] } })).toEqual({ numSet: new Set([1, 2, 3]) });
        });
        it('should unmarshall null values as empty sets', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { numSet: { NULL: true } }))
                .toEqual({ numSet: new Set() });
        });
        it('should unmarshall unexpected types as undefined', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { numSet: { SS: ['1', '2', '3'] } })).toEqual({});
        });
    });
    describe('set fields', function () {
        var schema = {
            fooSet: { type: 'Set', memberType: 'foo' },
        };
        it('should throw an error if the memberType is not recognized', function () {
            expect(function () { return unmarshallItem_1.unmarshallItem(schema, { fooSet: { NS: ['1', '2', '3'] } }); })
                .toThrowError(/Unrecognized set member type/);
        });
    });
    describe('string fields', function () {
        var schema = {
            string: { type: 'String' },
        };
        it('should unmarshall string fields', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { string: { S: 'string' } }))
                .toEqual({ string: 'string' });
        });
        it('should unmarshall null values as empty strings', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { string: { NULL: true } }))
                .toEqual({ string: '' });
        });
    });
    describe('string set fields', function () {
        var schema = {
            strSet: { type: 'Set', memberType: 'String' },
        };
        it('should unmarshall string set fields', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { strSet: { SS: ['a', 'b', 'c'] } })).toEqual({ strSet: new Set(['a', 'b', 'c']) });
        });
        it('should unmarshall null values as empty sets', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { strSet: { NULL: true } }))
                .toEqual({ strSet: new Set() });
        });
        it('should unmarshall unexpected types as undefined', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { strSet: { NS: ['a', 'b', 'c'] } })).toEqual({});
        });
    });
    describe('tuple fields', function () {
        var schema = {
            jobResult: {
                type: 'Tuple',
                members: [
                    { type: 'Boolean' },
                    { type: 'Number' },
                ],
            }
        };
        it('should unmarshall tuples', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, {
                jobResult: {
                    L: [
                        { BOOL: true },
                        { N: '123' },
                    ],
                },
            })).toEqual({ jobResult: [true, 123] });
        });
        it('should unmarshall unexpected types as undefined', function () {
            expect(unmarshallItem_1.unmarshallItem(schema, { jobResult: { BOOL: true } }))
                .toEqual({});
        });
    });
});
//# sourceMappingURL=unmarshallItem.spec.js.map