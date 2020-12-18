"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Marshaller_1 = require("./Marshaller");
var BinarySet_1 = require("./BinarySet");
var NumberValue_1 = require("./NumberValue");
var NumberValueSet_1 = require("./NumberValueSet");
describe('Marshaller', function () {
    describe('#marshallItem', function () {
        it('should convert objects to the DynamoDB item format', function () {
            var marshaller = new Marshaller_1.Marshaller();
            var marshalled = marshaller.marshallItem({
                string: 'foo',
                list: ['fizz', 'buzz', 'pop'],
                map: {
                    nestedMap: {
                        key: 'value',
                    }
                },
                number: 123,
                nullValue: null,
                boolValue: true,
                stringSet: new Set(['foo', 'bar', 'baz'])
            });
            expect(marshalled).toEqual({
                string: { S: 'foo' },
                list: { L: [{ S: 'fizz' }, { S: 'buzz' }, { S: 'pop' }] },
                map: {
                    M: {
                        nestedMap: {
                            M: {
                                key: { S: 'value' }
                            }
                        }
                    }
                },
                number: { N: '123' },
                nullValue: { NULL: true },
                boolValue: { BOOL: true },
                stringSet: { SS: ['foo', 'bar', 'baz'] }
            });
        });
        it('should return an empty attribute map when provided invalid input and the onInvalid option is set to "omit"', function () {
            var marshaller = new Marshaller_1.Marshaller({ onInvalid: 'omit' });
            expect(marshaller.marshallItem('string')).toEqual({});
        });
        it('should throw when provided invalid input and the onInvalid option is set to "throw"', function () {
            var marshaller = new Marshaller_1.Marshaller({ onInvalid: 'throw' });
            expect(function () { return marshaller.marshallItem('string'); }).toThrow();
        });
    });
    describe('#marshallValue', function () {
        describe('strings', function () {
            it('should convert strings to StringAttributeValues', function () {
                expect((new Marshaller_1.Marshaller()).marshallValue('string'))
                    .toEqual({ S: 'string' });
            });
            it('should convert empty strings to null when onEmpty option set to "nullify"', function () {
                expect((new Marshaller_1.Marshaller({ onEmpty: 'nullify' })).marshallValue('')).toEqual({ NULL: true });
            });
            it('should remove empty strings when onEmpty option set to "omit"', function () {
                expect((new Marshaller_1.Marshaller({ onEmpty: 'omit' })).marshallValue('')).toBeUndefined();
            });
            it('should convert empty strings to StringAttributeValues otherwise', function () {
                expect((new Marshaller_1.Marshaller()).marshallValue(''))
                    .toEqual({ S: '' });
            });
        });
        describe('binary values', function () {
            it('should convert binary values to BinaryAttributeValues', function () {
                var bin = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]);
                expect((new Marshaller_1.Marshaller()).marshallValue(bin))
                    .toEqual({ B: bin });
            });
            it('should convert empty binary values to null when onEmpty option set to "nullify"', function () {
                expect((new Marshaller_1.Marshaller({ onEmpty: 'nullify' }))
                    .marshallValue(new Uint8Array(0))).toEqual({ NULL: true });
            });
            it('should omit empty binary values when onEmpty option set to "omit"', function () {
                expect((new Marshaller_1.Marshaller({ onEmpty: 'omit' }))
                    .marshallValue(new Uint8Array(0))).toBeUndefined();
            });
            it('should convert empty binary values to null when onEmpty option set to "nullify"', function () {
                expect((new Marshaller_1.Marshaller()).marshallValue(new Uint8Array(0))).toEqual({ B: new Uint8Array(0) });
            });
        });
        describe('numbers', function () {
            it('should convert numbers to NumberAttributeValues', function () {
                expect((new Marshaller_1.Marshaller()).marshallValue(42))
                    .toEqual({ N: '42' });
            });
            it('should convert NumberValues to NumberAttributeValues', function () {
                expect((new Marshaller_1.Marshaller()).marshallValue(new NumberValue_1.NumberValue('123'))).toEqual({ N: '123' });
            });
        });
        describe('null', function () {
            it('should convert nulls to NullAttributeValues', function () {
                expect((new Marshaller_1.Marshaller()).marshallValue(null))
                    .toEqual({ NULL: true });
            });
        });
        describe('boolean', function () {
            it('should convert booleans to BooleanAttributeValues', function () {
                var marshaller = new Marshaller_1.Marshaller();
                expect(marshaller.marshallValue(true)).toEqual({ BOOL: true });
                expect(marshaller.marshallValue(false)).toEqual({ BOOL: false });
            });
        });
        describe('lists', function () {
            it('should convert arrays to ListAttributeValues', function () {
                expect((new Marshaller_1.Marshaller()).marshallValue([])).toEqual({ L: [] });
            });
            it('should convert list members to AttributeValues', function () {
                expect((new Marshaller_1.Marshaller()).marshallValue(['a', 1, true, null, {}])).toEqual({ L: [
                        { S: 'a' },
                        { N: '1' },
                        { BOOL: true },
                        { NULL: true },
                        { M: {} },
                    ] });
            });
            it('should convert iterables to ListAttributeValues', function () {
                var inputGen = function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, 'a'];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, 1];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, true];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, null];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, {}];
                            case 5:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                expect((new Marshaller_1.Marshaller()).marshallValue(inputGen())).toEqual({ L: [
                        { S: 'a' },
                        { N: '1' },
                        { BOOL: true },
                        { NULL: true },
                        { M: {} },
                    ] });
            });
            it('should omit undefined values from the serialized list', function () {
                expect((new Marshaller_1.Marshaller())
                    .marshallValue([
                    'a',
                    undefined,
                    1,
                    undefined,
                    true,
                    undefined,
                    null,
                    undefined,
                    {}
                ])).toEqual({ L: [
                        { S: 'a' },
                        { N: '1' },
                        { BOOL: true },
                        { NULL: true },
                        { M: {} },
                    ] });
            });
        });
        describe('maps', function () {
            it('should convert objects to MapAttributeValues', function () {
                expect((new Marshaller_1.Marshaller()).marshallValue({})).toEqual({ M: {} });
            });
            it('should convert maps to MapAttributeValues', function () {
                expect((new Marshaller_1.Marshaller()).marshallValue(new Map()))
                    .toEqual({ M: {} });
            });
            it('should omit keys whose values are serialized as undefined', function () {
                var marshaller = new Marshaller_1.Marshaller();
                expect(marshaller.marshallValue({ a: void 0 }))
                    .toEqual({ M: {} });
                expect(marshaller.marshallValue(new Map([['a', void 0]])))
                    .toEqual({ M: {} });
            });
            it('should convert objects with inheritance chains to MapAttributeValues', function () {
                var MyPrototype = /** @class */ (function () {
                    function MyPrototype() {
                        this.foo = 'bar';
                    }
                    return MyPrototype;
                }());
                var MyDescendant = /** @class */ (function (_super) {
                    tslib_1.__extends(MyDescendant, _super);
                    function MyDescendant() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.fizz = 'buzz';
                        return _this;
                    }
                    return MyDescendant;
                }(MyPrototype));
                var myInstance = new MyDescendant();
                myInstance.quux = true;
                expect((new Marshaller_1.Marshaller()).marshallValue(myInstance))
                    .toEqual({
                    M: {
                        foo: { S: 'bar' },
                        fizz: { S: 'buzz' },
                        quux: { BOOL: true }
                    }
                });
            });
            it('should convert map members to AttributeValues', function () {
                var map = new Map();
                map.set('a', 'a');
                map.set('b', 1);
                map.set('c', true);
                map.set('d', null);
                map.set('e', ['s']);
                expect((new Marshaller_1.Marshaller()).marshallValue(map)).toEqual({
                    M: {
                        a: { S: 'a' },
                        b: { N: '1' },
                        c: { BOOL: true },
                        d: { NULL: true },
                        e: { L: [{ S: 's' }] }
                    }
                });
            });
            it('should omit map members whose keys are not strings when the onInvalid option is "omit"', function () {
                var marshaller = new Marshaller_1.Marshaller({
                    onInvalid: 'omit'
                });
                var map = new Map();
                map.set('a', 'a');
                map.set(1, 1);
                map.set({}, true);
                map.set([], null);
                map.set(null, ['s']);
                expect(marshaller.marshallValue(map))
                    .toEqual({ M: { a: { S: 'a' } } });
            });
            it('should throw otherwise', function () {
                var marshaller = new Marshaller_1.Marshaller();
                var map = new Map();
                map.set('a', 'a');
                map.set(1, 1);
                map.set({}, true);
                map.set([], null);
                map.set(null, ['s']);
                expect(function () { return marshaller.marshallValue(map); }).toThrow();
            });
        });
        describe('sets', function () {
            it('should omit empty sets when the onEmpty option is "omit"', function () {
                var marshaller = new Marshaller_1.Marshaller({ onEmpty: 'omit' });
                expect(marshaller.marshallValue(new Set()))
                    .toBeUndefined();
            });
            it('should convert empty sets to null when the onEmpty option is "nullify"', function () {
                var marshaller = new Marshaller_1.Marshaller({ onEmpty: 'nullify' });
                expect(marshaller.marshallValue(new Set()))
                    .toEqual({ NULL: true });
            });
            it('should omit empty sets when the onEmpty option is "leave", as the kind of set cannot be inferred', function () {
                var marshaller = new Marshaller_1.Marshaller({ onEmpty: 'leave' });
                expect(marshaller.marshallValue(new Set()))
                    .toBeUndefined();
            });
            it('should omit sets with members of an unknown type when the onEmpty option is "omit"', function () {
                var marshaller = new Marshaller_1.Marshaller({
                    onInvalid: 'omit'
                });
                var set = new Set();
                set.add({});
                expect(marshaller.marshallValue(set))
                    .toBeUndefined();
            });
            it('should throw on sets with members of an unknown type otherwise', function () {
                var marshaller = new Marshaller_1.Marshaller();
                var set = new Set();
                set.add({});
                expect(function () { return marshaller.marshallValue(set); }).toThrow();
            });
            it('should drop invalid members when onInvalid option is set to "omit"', function () {
                var marshaller = new Marshaller_1.Marshaller({
                    onInvalid: 'omit'
                });
                expect(marshaller.marshallValue(new Set(['a', 1, 'c'])))
                    .toEqual({ SS: ['a', 'c'] });
            });
            it('should throw on invalid members otherwise', function () {
                var marshaller = new Marshaller_1.Marshaller();
                expect(function () { return marshaller.marshallValue(new Set(['a', 1, 'c'])); }).toThrow();
            });
            it('should return a NullAttributeValue for an emptied set when onEmpty is set to "nullify"', function () {
                var marshaller = new Marshaller_1.Marshaller({ onEmpty: 'nullify' });
                expect(marshaller.marshallValue(new Set([''])))
                    .toEqual({ NULL: true });
            });
            it('should return undefined for an emptied set when onEmpty is set to "omit"', function () {
                var marshaller = new Marshaller_1.Marshaller({ onEmpty: 'omit' });
                expect(marshaller.marshallValue(new Set([''])))
                    .toBeUndefined();
            });
            it('should serialize empty values otherwise', function () {
                var marshaller = new Marshaller_1.Marshaller();
                expect(marshaller.marshallValue(new Set([''])))
                    .toEqual({ SS: [''] });
            });
            describe('string sets', function () {
                it('should convert sets with strings into StringSetAttributeValues', function () {
                    expect((new Marshaller_1.Marshaller())
                        .marshallValue(new Set(['a', 'b', 'c']))).toEqual({ SS: ['a', 'b', 'c'] });
                });
                it('should drop empty members when onEmpty option is set to "nullify"', function () {
                    expect((new Marshaller_1.Marshaller({ onEmpty: 'nullify' }))
                        .marshallValue(new Set(['a', '', 'c']))).toEqual({ SS: ['a', 'c'] });
                });
                it('should drop empty members when onEmpty option is set to "omit"', function () {
                    expect((new Marshaller_1.Marshaller({ onEmpty: 'omit' }))
                        .marshallValue(new Set(['a', '', 'c']))).toEqual({ SS: ['a', 'c'] });
                });
                it('should keep empty members otherwise', function () {
                    expect((new Marshaller_1.Marshaller())
                        .marshallValue(new Set(['a', '', 'c']))).toEqual({ SS: ['a', '', 'c'] });
                });
            });
            describe('number sets', function () {
                it('should convert sets with numbers into NumberSetAttributeValues', function () {
                    expect((new Marshaller_1.Marshaller())
                        .marshallValue(new Set([1, 2, 3]))).toEqual({ NS: ['1', '2', '3'] });
                });
                it('should convert NumberValueSet objects into NumberSetAttributeValues', function () {
                    expect((new Marshaller_1.Marshaller())
                        .marshallValue(new NumberValueSet_1.NumberValueSet([
                        new NumberValue_1.NumberValue('1'),
                        new NumberValue_1.NumberValue('2'),
                        new NumberValue_1.NumberValue('3'),
                    ]))).toEqual({ NS: ['1', '2', '3'] });
                });
            });
            describe('binary sets', function () {
                it('should convert sets with binary values into BinarySetAttributeValues', function () {
                    var marshaller = new Marshaller_1.Marshaller();
                    var converted = marshaller.marshallValue(new BinarySet_1.BinarySet([
                        Uint8Array.from([0xde, 0xad]),
                        Uint8Array.from([0xbe, 0xef]).buffer,
                        Uint8Array.from([0xfa, 0xce]),
                    ]));
                    expect(converted).toEqual({ BS: [
                            Uint8Array.from([0xde, 0xad]),
                            Uint8Array.from([0xbe, 0xef]).buffer,
                            Uint8Array.from([0xfa, 0xce]),
                        ] });
                });
                it('should drop empty members when the onEmpty option is set to "nullify"', function () {
                    var marshaller = new Marshaller_1.Marshaller({ onEmpty: 'nullify' });
                    var converted = marshaller.marshallValue(new BinarySet_1.BinarySet([
                        Uint8Array.from([0xde, 0xad]),
                        Uint8Array.from([0xbe, 0xef]).buffer,
                        Uint8Array.from([0xfa, 0xce]),
                        new Uint8Array(0),
                    ]));
                    expect(converted).toEqual({ BS: [
                            Uint8Array.from([0xde, 0xad]),
                            Uint8Array.from([0xbe, 0xef]).buffer,
                            Uint8Array.from([0xfa, 0xce]),
                        ] });
                });
                it('should drop empty members when the onEmpty option is set to "omit"', function () {
                    var marshaller = new Marshaller_1.Marshaller({ onEmpty: 'omit' });
                    var converted = marshaller.marshallValue(new BinarySet_1.BinarySet([
                        Uint8Array.from([0xde, 0xad]),
                        Uint8Array.from([0xbe, 0xef]).buffer,
                        Uint8Array.from([0xfa, 0xce]),
                        new Uint8Array(0),
                    ]));
                    expect(converted).toEqual({ BS: [
                            Uint8Array.from([0xde, 0xad]),
                            Uint8Array.from([0xbe, 0xef]).buffer,
                            Uint8Array.from([0xfa, 0xce]),
                        ] });
                });
                it('should keep empty members otherwise', function () {
                    var marshaller = new Marshaller_1.Marshaller();
                    var converted = marshaller.marshallValue(new BinarySet_1.BinarySet([
                        Uint8Array.from([0xde, 0xad]),
                        Uint8Array.from([0xbe, 0xef]).buffer,
                        Uint8Array.from([0xfa, 0xce]),
                        new Uint8Array(0),
                    ]));
                    expect(converted).toEqual({ BS: [
                            Uint8Array.from([0xde, 0xad]),
                            Uint8Array.from([0xbe, 0xef]).buffer,
                            Uint8Array.from([0xfa, 0xce]),
                            new Uint8Array(0),
                        ] });
                });
            });
        });
        describe('undefined values', function () {
            it('should return undefined for undefined', function () {
                expect((new Marshaller_1.Marshaller().marshallValue(void 0)))
                    .toBeUndefined();
            });
        });
        describe('symbols', function () {
            it('should omit symbols when the onInvalid option is set to "omit"', function () {
                expect((new Marshaller_1.Marshaller({ onInvalid: 'omit' })
                    .marshallValue(Symbol.iterator))).toBeUndefined();
            });
            it('should throw on symbols otherwise', function () {
                expect(function () { return (new Marshaller_1.Marshaller().marshallValue(Symbol.iterator)); }).toThrow();
            });
        });
        describe('functions', function () {
            it('should omit functions when the onInvalid option is set to "omit"', function () {
                expect((new Marshaller_1.Marshaller({ onInvalid: 'omit' })
                    .marshallValue(function () { }))).toBeUndefined();
            });
            it('should throw on symbols otherwise', function () {
                expect(function () { return (new Marshaller_1.Marshaller().marshallValue(function () { })); }).toThrow();
            });
        });
    });
    describe('#unmarshallItem', function () {
        it('should convert DynamoDB items to plain vanilla JS objects', function () {
            var unmarshalled = (new Marshaller_1.Marshaller({ unwrapNumbers: true })).unmarshallItem({
                string: { S: 'foo' },
                list: { L: [{ S: 'fizz' }, { S: 'buzz' }, { S: 'pop' }] },
                map: {
                    M: {
                        nestedMap: {
                            M: {
                                key: { S: 'value' }
                            }
                        }
                    }
                },
                number: { N: '123' },
                nullValue: { NULL: true },
                boolValue: { BOOL: true }
            });
            expect(unmarshalled).toEqual({
                string: 'foo',
                list: ['fizz', 'buzz', 'pop'],
                map: {
                    nestedMap: {
                        key: 'value',
                    }
                },
                number: 123,
                nullValue: null,
                boolValue: true
            });
        });
    });
    describe('#unmarshallValue', function () {
        var marshaller = new Marshaller_1.Marshaller();
        describe('strings', function () {
            it('should convert StringAttributeValues to strings', function () {
                expect(marshaller.unmarshallValue({ S: 'string' }))
                    .toEqual('string');
            });
        });
        describe('binary values', function () {
            it('should convert BinaryAttributeValues to binary values', function () {
                expect(marshaller.unmarshallValue({ B: new Uint8Array(1) }))
                    .toEqual(new Uint8Array(1));
            });
        });
        describe('numbers', function () {
            it('should convert NumberAttributeValues to NumberValues', function () {
                var unsafeInteger = '9007199254740991000';
                var converted = marshaller.unmarshallValue({ N: unsafeInteger });
                expect(converted.toString()).toBe(unsafeInteger);
            });
            it('should convert NumberAttributeValues to numbers when unwrapNumbers is true', function () {
                var marshaller = new Marshaller_1.Marshaller({ unwrapNumbers: true });
                expect(marshaller.unmarshallValue({ N: '42' })).toEqual(42);
            });
        });
        describe('null', function () {
            it('should convert NullAttributeValues to null', function () {
                expect(marshaller.unmarshallValue({ NULL: true })).toEqual(null);
            });
        });
        describe('boolean', function () {
            it('should convert BooleanAttributeValues to booleans', function () {
                expect(marshaller.unmarshallValue({ BOOL: true })).toEqual(true);
                expect(marshaller.unmarshallValue({ BOOL: false }))
                    .toEqual(false);
            });
        });
        describe('lists', function () {
            it('should convert ListAttributeValues to lists', function () {
                expect(marshaller.unmarshallValue({ L: [] })).toEqual([]);
            });
            it('should convert member AttributeValues to list members', function () {
                expect(marshaller.unmarshallValue({ L: [
                        { S: 'a' },
                        { N: '1' },
                        { BOOL: true },
                        { NULL: true },
                        { M: {} }
                    ] })).toEqual(['a', new NumberValue_1.NumberValue('1'), true, null, {}]);
            });
        });
        describe('maps', function () {
            it('should convert MapAttributeValues to objects', function () {
                expect(marshaller.unmarshallValue({ M: {} })).toEqual({});
            });
            it('should convert member AttributeValues to map members', function () {
                expect(marshaller.unmarshallValue({
                    M: {
                        a: { S: 'a' },
                        b: { N: '1' },
                        c: { BOOL: true },
                        d: { NULL: true },
                        e: { L: [{ S: 's' }] }
                    }
                })).toEqual({
                    a: 'a',
                    b: new NumberValue_1.NumberValue('1'),
                    c: true,
                    d: null,
                    e: ['s'],
                });
            });
        });
        describe('string sets', function () {
            it('should convert StringSetAttributeValues into sets with strings', function () {
                expect(marshaller.unmarshallValue({ SS: ['a', 'b', 'c'] }))
                    .toEqual(new Set(['a', 'b', 'c']));
            });
        });
        describe('number sets', function () {
            it('should convert NumberSetAttributeValues into sets with NumberValues', function () {
                var unsafeInteger = '900719925474099100';
                var converted = marshaller.unmarshallValue({ NS: [
                        unsafeInteger + '1',
                        unsafeInteger + '2',
                        unsafeInteger + '3',
                    ] });
                expect(converted).toEqual(new NumberValueSet_1.NumberValueSet([
                    new NumberValue_1.NumberValue(unsafeInteger + '1'),
                    new NumberValue_1.NumberValue(unsafeInteger + '2'),
                    new NumberValue_1.NumberValue(unsafeInteger + '3'),
                ]));
            });
            it('should convert NumberSetAttributeValues into sets with numbers when unwrapNumbers is true', function () {
                var marshaller = new Marshaller_1.Marshaller({ unwrapNumbers: true });
                expect(marshaller.unmarshallValue({ NS: ['1', '2', '3'] }))
                    .toEqual(new Set([1, 2, 3]));
            });
        });
        describe('binary sets', function () {
            it('should convert BinarySetAttributeValues into sets with binary strings', function () {
                expect(marshaller.unmarshallValue({ BS: [
                        new Uint8Array(1),
                        new Uint8Array(2),
                    ] })).toEqual(new BinarySet_1.BinarySet([
                    new Uint8Array(1),
                    new Uint8Array(2),
                ]));
            });
        });
        it('should convert objects with no values to empty maps', function () {
            expect(marshaller.unmarshallValue({ foo: 'bar' }))
                .toEqual({});
        });
    });
});
//# sourceMappingURL=Marshaller.spec.js.map