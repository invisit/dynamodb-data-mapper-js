"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var marshallItem_1 = require("./marshallItem");
var objectContaining = jasmine.objectContaining;
var dynamodb_auto_marshaller_1 = require("@invisit/dynamodb-auto-marshaller");
describe('marshallItem', function () {
    it('should serialize fields to their attributeName if provided', function () {
        var schema = {
            boolean: {
                type: 'Boolean',
                attributeName: 'bool_field',
            },
        };
        expect(marshallItem_1.marshallItem(schema, { boolean: true })).toEqual({
            bool_field: { BOOL: true },
        });
    });
    it('should ignore fields not mentioned in the schema', function () {
        expect(marshallItem_1.marshallItem({ foo: { type: 'String' } }, { bar: 'baz' })).toEqual({});
    });
    it('should ignore fields whose value is undefined', function () {
        expect(marshallItem_1.marshallItem({ foo: { type: 'String' } }, { foo: void 0 }))
            .toEqual({});
    });
    it('should throw if the schema type tag is not recognized', function () {
        expect(function () { return marshallItem_1.marshallItem({ foo: { type: 'Foo' } }, { foo: 'bar' }); })
            .toThrow('Unrecognized schema node');
    });
    describe('default values', function () {
        it('should call a defined default provider if the input is undefined', function () {
            var defaultProvider = jest.fn(function () { return 'foo'; });
            expect(marshallItem_1.marshallItem({ foo: { type: 'String', defaultProvider: defaultProvider } }, { foo: void 0 })).toEqual({ foo: { S: 'foo' } });
            expect(defaultProvider.mock.calls.length).toBe(1);
        });
        it('should not call the default provider if the input is defined', function () {
            var defaultProvider = jest.fn(function () { return 'foo'; });
            expect(marshallItem_1.marshallItem({ foo: { type: 'String', defaultProvider: defaultProvider } }, { foo: 'bar' })).toEqual({ foo: { S: 'bar' } });
            expect(defaultProvider.mock.calls.length).toBe(0);
        });
    });
    describe('"any" (untyped) fields', function () {
        it('should marshall of untyped data', function () {
            var schema = { mixedList: { type: 'Any' } };
            var input = {
                mixedList: [
                    'string',
                    123,
                    undefined,
                    new ArrayBuffer(12),
                    { foo: 'bar' },
                    ['one string', 234, new ArrayBuffer(5)],
                ]
            };
            expect(marshallItem_1.marshallItem(schema, input)).toEqual({
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
                },
            });
        });
    });
    describe('binary fields', function () {
        it('should serialize fields of binary types from ArrayBuffers', function () {
            var binaryDoc = {
                binary: { type: 'Binary' },
            };
            var document = {
                binary: new ArrayBuffer(15),
            };
            expect(marshallItem_1.marshallItem(binaryDoc, document)).toEqual({
                binary: { B: new Uint8Array(15) },
            });
        });
        it('should serialize binary fields from ArrayBufferViews', function () {
            var binaryDoc = {
                binary: { type: 'Binary' },
            };
            var document = {
                binary: new Int32Array(4),
            };
            expect(marshallItem_1.marshallItem(binaryDoc, document)).toEqual({
                binary: { B: new Uint8Array(16) },
            });
        });
        it('should convert UTF-8 strings to Uint8Arrays', function () {
            var binaryDoc = {
                binary: { type: 'Binary' },
            };
            var document = {
                binary: '☃💩',
            };
            expect(marshallItem_1.marshallItem(binaryDoc, document)).toEqual({
                binary: { B: new Uint8Array([226, 152, 131, 240, 159, 146, 169]) },
            });
        });
        it('should convert empty binary values to NULL', function () {
            var binaryDoc = {
                binary: { type: 'Binary' },
            };
            var document = {
                binary: new Int32Array(0),
            };
            expect(marshallItem_1.marshallItem(binaryDoc, document)).toEqual({
                binary: { NULL: true },
            });
        });
    });
    describe('binary set fields', function () {
        var schema = {
            binSet: { type: 'Set', memberType: 'Binary' },
        };
        it('should serialize BinarySet fields', function () {
            expect(marshallItem_1.marshallItem(schema, {
                binSet: new dynamodb_auto_marshaller_1.BinarySet([
                    new Uint8Array(1),
                    new Uint8Array(2),
                    new Uint8Array(3),
                ])
            })).toEqual({
                binSet: {
                    BS: [
                        new Uint8Array(1),
                        new Uint8Array(2),
                        new Uint8Array(3),
                    ]
                },
            });
        });
        it('should deduplicate values included in the input', function () {
            expect(marshallItem_1.marshallItem(schema, {
                binSet: [
                    Uint8Array.from([240, 159, 144, 142, 240, 159, 145, 177, 226, 157, 164]).buffer,
                    Uint8Array.from([240, 159, 144, 142, 240, 159, 145, 177, 226, 157, 164]),
                    '🐎👱❤',
                ]
            })).toEqual({
                binSet: {
                    BS: [
                        Uint8Array.from([240, 159, 144, 142, 240, 159, 145, 177, 226, 157, 164]),
                    ]
                },
            });
        });
        it('should remove empty values from sets', function () {
            expect(marshallItem_1.marshallItem(schema, {
                binSet: new dynamodb_auto_marshaller_1.BinarySet([
                    new ArrayBuffer(0),
                    new ArrayBuffer(1),
                    new ArrayBuffer(2),
                    new ArrayBuffer(3),
                    new ArrayBuffer(0),
                ])
            })).toEqual({
                binSet: {
                    BS: [
                        new Uint8Array(1),
                        new Uint8Array(2),
                        new Uint8Array(3),
                    ]
                },
            });
        });
        it('should render empty sets as NullAttributeValues', function () {
            expect(marshallItem_1.marshallItem(schema, { binSet: [new ArrayBuffer(0)] }))
                .toEqual({
                binSet: { NULL: true },
            });
        });
    });
    describe('boolean fields', function () {
        it('should marshall boolean fields', function () {
            var schema = {
                boolean: { type: 'Boolean' },
            };
            expect(marshallItem_1.marshallItem(schema, { boolean: false })).toEqual({
                boolean: { BOOL: false },
            });
        });
    });
    describe('custom fields', function () {
        it('should use the marshaller function embedded in the type', function () {
            var marshaller = jest.fn(function () { return ({ S: 'stubbed' }); });
            var schema = {
                custom: {
                    type: 'Custom',
                    marshall: marshaller,
                    unmarshall: jest.fn()
                },
            };
            var document = { custom: 'a value' };
            expect(marshallItem_1.marshallItem(schema, document))
                .toEqual({ custom: { S: 'stubbed' } });
            expect(marshaller.mock.calls.length).toBe(1);
            expect(marshaller.mock.calls[0][0]).toBe(document.custom);
        });
    });
    describe('collection fields', function () {
        it('should marshall iterables of untyped data', function () {
            var schema = { mixedList: { type: 'Collection' } };
            var input = {
                mixedList: [
                    'string',
                    123,
                    undefined,
                    new ArrayBuffer(12),
                    { foo: 'bar' },
                    ['one string', 234, new ArrayBuffer(5)],
                ]
            };
            expect(marshallItem_1.marshallItem(schema, input)).toEqual({
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
                },
            });
        });
    });
    describe('date fields', function () {
        var iso8601 = '2000-01-01T00:00:00Z';
        var epoch = 946684800;
        it('should marshall date objects', function () {
            var aDate = new Date(iso8601);
            var schema = { aDate: { type: 'Date' } };
            expect(marshallItem_1.marshallItem(schema, { aDate: aDate })).toEqual({
                aDate: { N: epoch.toString(10) },
            });
        });
        it('should marshall date strings', function () {
            var schema = { aDate: { type: 'Date' } };
            expect(marshallItem_1.marshallItem(schema, { aDate: iso8601 })).toEqual({
                aDate: { N: epoch.toString(10) },
            });
        });
        it('should marshall numbers as epoch timestamps', function () {
            var schema = { aDate: { type: 'Date' } };
            expect(marshallItem_1.marshallItem(schema, { aDate: epoch })).toEqual({
                aDate: { N: epoch.toString(10) },
            });
        });
        it('should throw if an unexpected input is received', function () {
            var schema = { aDate: { type: 'Date' } };
            expect(function () { return marshallItem_1.marshallItem(schema, { aDate: new ArrayBuffer(10) }); })
                .toThrow(objectContaining({ invalidValue: new ArrayBuffer(10) }));
        });
    });
    describe('document fields', function () {
        it('should marshall documents as String => AttributeValue maps', function () {
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
            var input = { nested: { nested: { scalar: 'value' } } };
            expect(marshallItem_1.marshallItem(schema, input)).toEqual({
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
            });
        });
    });
    describe('hash fields', function () {
        it('should marshall objects of untyped data', function () {
            var schema = { mixedObject: { type: 'Hash' } };
            var input = {
                mixedObject: {
                    foo: 'string',
                    bar: 123,
                    baz: new ArrayBuffer(12),
                    fizz: { foo: 'bar' },
                    buzz: ['one string', 234, new Uint8Array(5)],
                    snap: new Set(['foo', 'foo', 'bar', 'bar', 'baz']),
                    crackle: new Set([0, 1, 2, 3, 0, 1, 2, 3]),
                    pop: new dynamodb_auto_marshaller_1.BinarySet([
                        new Uint8Array(1),
                        new Uint8Array(2),
                        new Uint8Array(3),
                    ])
                }
            };
            expect(marshallItem_1.marshallItem(schema, input)).toEqual({
                mixedObject: {
                    M: {
                        foo: { S: 'string' },
                        bar: { N: '123' },
                        baz: { B: new ArrayBuffer(12) },
                        fizz: { M: { foo: { S: 'bar' } } },
                        buzz: {
                            L: [
                                { S: 'one string' },
                                { N: '234' },
                                { B: new Uint8Array(5) },
                            ]
                        },
                        snap: { SS: ['foo', 'bar', 'baz'] },
                        crackle: { NS: ['0', '1', '2', '3'] },
                        pop: { BS: [
                                new Uint8Array(1),
                                new Uint8Array(2),
                                new Uint8Array(3),
                            ] }
                    },
                },
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
        it('should serialize an array of like items', function () {
            expect(marshallItem_1.marshallItem(schema, { list: ['a', 'b', 'c'] })).toEqual({
                list: {
                    L: [
                        { S: 'a' },
                        { S: 'b' },
                        { S: 'c' },
                    ],
                },
            });
        });
        it('should serialize an iterable of like items', function () {
            var stringIterable = function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, 'a'];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, 'b'];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, 'c'];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            };
            expect(marshallItem_1.marshallItem(schema, { list: stringIterable() })).toEqual({
                list: {
                    L: [
                        { S: 'a' },
                        { S: 'b' },
                        { S: 'c' },
                    ],
                },
            });
        });
        it('should nullify empty members', function () {
            expect(marshallItem_1.marshallItem(schema, { list: ['a', '', 'c'] })).toEqual({
                list: {
                    L: [
                        { S: 'a' },
                        { NULL: true },
                        { S: 'c' },
                    ],
                },
            });
        });
    });
    describe('map fields', function () {
        var schema = {
            map: {
                type: 'Map',
                memberType: { type: 'String' },
            },
        };
        it('should serialize an object with like values', function () {
            expect(marshallItem_1.marshallItem(schema, { map: { foo: 'bar', fizz: 'buzz' } }))
                .toEqual({
                map: {
                    M: {
                        foo: { S: 'bar' },
                        fizz: { S: 'buzz' },
                    },
                },
            });
        });
        it('should serialize a [string, ValueType] iterable', function () {
            var iterable = new Map([
                ['foo', 'bar'],
                ['fizz', 'buzz'],
            ]);
            expect(marshallItem_1.marshallItem(schema, { map: iterable })).toEqual({
                map: {
                    M: {
                        foo: { S: 'bar' },
                        fizz: { S: 'buzz' },
                    },
                },
            });
        });
        it('should throw if a value that cannot be converted to a map is received', function () {
            expect(function () { return marshallItem_1.marshallItem(schema, { map: 234 }); }).toThrow();
        });
    });
    describe('null fields', function () {
        it('should always return a null AttributeValue', function () {
            var e_1, _a;
            try {
                for (var _b = tslib_1.__values(['string', 234, false, [], {}, new Int8Array(0)]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var value = _c.value;
                    expect(marshallItem_1.marshallItem({ value: { type: 'Null' } }, { value: value }))
                        .toEqual({ value: { NULL: true } });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    });
    describe('number fields', function () {
        it('should marshall number fields', function () {
            expect(marshallItem_1.marshallItem({ num: { type: 'Number' } }, { num: 123 }))
                .toEqual({ num: { N: '123' } });
        });
    });
    describe('number set fields', function () {
        var schema = {
            numSet: { type: 'Set', memberType: 'Number' },
        };
        it('should serialize NumberSet fields', function () {
            expect(marshallItem_1.marshallItem(schema, { numSet: new Set([1, 2, 3]) }))
                .toEqual({
                numSet: { NS: ['1', '2', '3'] },
            });
        });
        it('should deduplicate values included in the input', function () {
            expect(marshallItem_1.marshallItem(schema, { numSet: [1, 2, 3, 1] }))
                .toEqual({
                numSet: { NS: ['1', '2', '3'] },
            });
        });
        it('should render empty sets as NullAttributeValues', function () {
            expect(marshallItem_1.marshallItem(schema, { numSet: [] }))
                .toEqual({
                numSet: { NULL: true },
            });
        });
    });
    describe('set fields', function () {
        var schema = {
            fooSet: { type: 'Set', memberType: 'foo' },
        };
        it('should throw an error if the memberType is not recognized', function () {
            expect(function () { return marshallItem_1.marshallItem(schema, { fooSet: [1, 2, 3, 1] }); })
                .toThrowError(/Unrecognized set member type/);
        });
    });
    describe('string fields', function () {
        it('should marshall string fields', function () {
            expect(marshallItem_1.marshallItem({ str: { type: 'String' } }, { str: 'string' }))
                .toEqual({ str: { S: 'string' } });
        });
        it('should marshall stringable objects', function () {
            expect(marshallItem_1.marshallItem({ str: { type: 'String' } }, { str: {} }))
                .toEqual({ str: { S: '[object Object]' } });
        });
        it('should render empty strings as a NullAttributeValue', function () {
            expect(marshallItem_1.marshallItem({ str: { type: 'String' } }, { str: '' }))
                .toEqual({ str: { NULL: true } });
        });
    });
    describe('string set fields', function () {
        var schema = {
            strSet: { type: 'Set', memberType: 'String' },
        };
        it('should serialize StringSet fields', function () {
            expect(marshallItem_1.marshallItem(schema, { strSet: new Set(['a', 'b', 'c']) }))
                .toEqual({
                strSet: { SS: ['a', 'b', 'c'] },
            });
        });
        it('should deduplicate values included in the input', function () {
            expect(marshallItem_1.marshallItem(schema, { strSet: ['a', 'b', 'c', 'a'] }))
                .toEqual({
                strSet: { SS: ['a', 'b', 'c'] },
            });
        });
        it('should remove empty values from sets', function () {
            expect(marshallItem_1.marshallItem(schema, { strSet: ['', 'a', 'b', 'c', ''] }))
                .toEqual({
                strSet: { SS: ['a', 'b', 'c'] },
            });
        });
        it('should render empty sets as NullAttributeValues', function () {
            expect(marshallItem_1.marshallItem(schema, { strSet: ['', ''] }))
                .toEqual({
                strSet: { NULL: true },
            });
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
        it('should serialize Tuples', function () {
            expect(marshallItem_1.marshallItem(schema, { jobResult: [true, 123] })).toEqual({
                jobResult: {
                    L: [
                        { BOOL: true },
                        { N: '123' },
                    ],
                },
            });
        });
    });
});
//# sourceMappingURL=marshallItem.spec.js.map