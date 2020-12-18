"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NumberValue_1 = require("./NumberValue");
describe('NumberValue', function () {
    it('should store numbers', function () {
        var number = new NumberValue_1.NumberValue(123);
        expect(number.toString()).toBe('123');
    });
    it('should store numeric strings', function () {
        var number = new NumberValue_1.NumberValue('123.1');
        expect(number.toString()).toBe('123.1');
    });
    it('should store numeric values that would lose precision if converted to JavaScript numbers', function () {
        var number = new NumberValue_1.NumberValue('900719925474099100');
        if (typeof Number.isSafeInteger === 'function') {
            expect(Number.isSafeInteger(number.valueOf()))
                .toBe(false);
        }
        expect(number.toString()).toBe('900719925474099100');
    });
    it('should convert numeric strings to numbers', function () {
        var number = new NumberValue_1.NumberValue('123.1');
        expect(number.valueOf()).toBe(123.1);
    });
    it('should allow easy conversion of the value into a number', function () {
        var safeNum = new NumberValue_1.NumberValue('123');
        expect(+safeNum).toBe(123);
        expect(safeNum + 1).toBe(124);
    });
    it('should appear as a numeric value when converted to JSON', function () {
        expect(JSON.stringify({
            number: new NumberValue_1.NumberValue('123'),
            nested: {
                number: new NumberValue_1.NumberValue('234')
            }
        })).toBe('{"number":123,"nested":{"number":234}}');
    });
    it('should reply to Object.prototype.toString with [object DynamoDbNumberValue]', function () {
        var number = new NumberValue_1.NumberValue('900719925474099100');
        expect(Object.prototype.toString.call(number))
            .toBe('[object DynamoDbNumberValue]');
    });
    describe('::isNumberValue', function () {
        it('should return `true` for NumberValue objects', function () {
            expect(NumberValue_1.NumberValue.isNumberValue(new NumberValue_1.NumberValue('0'))).toBe(true);
        });
        it('should return `false` for other values', function () {
            var e_1, _a;
            try {
                for (var _b = tslib_1.__values([
                    'string',
                    123,
                    null,
                    void 0,
                    true,
                    [],
                    {},
                    new Uint8Array(10)
                ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var invalid = _c.value;
                    expect(NumberValue_1.NumberValue.isNumberValue(invalid)).toBe(false);
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
});
//# sourceMappingURL=NumberValue.spec.js.map