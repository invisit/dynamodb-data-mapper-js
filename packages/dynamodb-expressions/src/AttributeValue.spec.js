"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AttributeValue_1 = require("./AttributeValue");
describe('AttributeValue', function () {
    describe('::isAttributeValue', function () {
        it('should accept valid attribute values', function () {
            var value = new AttributeValue_1.AttributeValue({
                S: 'string',
            });
            expect(AttributeValue_1.AttributeValue.isAttributeValue(value)).toBe(true);
        });
        it('should reject non-matching values', function () {
            var e_1, _a;
            try {
                for (var _b = tslib_1.__values([
                    false,
                    true,
                    null,
                    void 0,
                    'string',
                    123,
                    [],
                    {},
                    new Uint8Array(12),
                    { foo: 'bar' },
                    { name: 'foo', arguments: 'bar' },
                    { S: 'string' }
                ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var notAttributeValue = _c.value;
                    expect(AttributeValue_1.AttributeValue.isAttributeValue(notAttributeValue)).toBe(false);
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
//# sourceMappingURL=AttributeValue.spec.js.map