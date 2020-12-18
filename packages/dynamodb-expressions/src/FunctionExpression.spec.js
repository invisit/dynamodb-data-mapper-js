"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FunctionExpression_1 = require("./FunctionExpression");
var ExpressionAttributes_1 = require("./ExpressionAttributes");
var AttributePath_1 = require("./AttributePath");
describe('FunctionExpression', function () {
    var basicFunctionExpression = new FunctionExpression_1.FunctionExpression('foo', new AttributePath_1.AttributePath('bar'), 'baz');
    describe('::isFunctionExpression', function () {
        it('should accept valid function expressions', function () {
            expect(FunctionExpression_1.FunctionExpression.isFunctionExpression(basicFunctionExpression)).toBe(true);
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
                ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var notFunctionExpression = _c.value;
                    expect(FunctionExpression_1.FunctionExpression.isFunctionExpression(notFunctionExpression)).toBe(false);
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
    describe('#serialize', function () {
        it('should serialize basic function expressions', function () {
            var attributes = new ExpressionAttributes_1.ExpressionAttributes();
            expect(basicFunctionExpression.serialize(attributes)).toBe('foo(#attr0, :val1)');
            expect(attributes.names).toEqual({
                '#attr0': 'bar',
            });
            expect(attributes.values).toEqual({
                ':val1': { S: 'baz' },
            });
        });
        it('should support nested function expressions', function () {
            var nestedFunction = new FunctionExpression_1.FunctionExpression('foo', new AttributePath_1.AttributePath('bar'), 'baz', new FunctionExpression_1.FunctionExpression('fizz', new FunctionExpression_1.FunctionExpression('buzz', new AttributePath_1.AttributePath('bar'))));
            var attributes = new ExpressionAttributes_1.ExpressionAttributes();
            expect(nestedFunction.serialize(attributes)).toBe('foo(#attr0, :val1, fizz(buzz(#attr0)))');
            expect(attributes.names).toEqual({
                '#attr0': 'bar',
            });
            expect(attributes.values).toEqual({
                ':val1': { S: 'baz' },
            });
        });
    });
});
//# sourceMappingURL=FunctionExpression.spec.js.map