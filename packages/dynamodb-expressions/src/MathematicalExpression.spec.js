"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AttributePath_1 = require("./AttributePath");
var ExpressionAttributes_1 = require("./ExpressionAttributes");
var FunctionExpression_1 = require("./FunctionExpression");
var MathematicalExpression_1 = require("./MathematicalExpression");
describe('MathematicalExpression', function () {
    var validExpressions = [
        [
            new MathematicalExpression_1.MathematicalExpression(new AttributePath_1.AttributePath('foo'), '+', 1),
            '#attr0 + :val1',
            { '#attr0': 'foo' },
            { ':val1': { N: '1' } },
        ],
        [
            new MathematicalExpression_1.MathematicalExpression(new FunctionExpression_1.FunctionExpression('if_not_exists', new AttributePath_1.AttributePath('current_id'), 0), '+', 1),
            'if_not_exists(#attr0, :val1) + :val2',
            { '#attr0': 'current_id' },
            {
                ':val1': { N: '0' },
                ':val2': { N: '1' },
            },
        ]
    ];
    describe('::isMathematicalExpression', function () {
        it('should accept valid mathematical expressions', function () {
            var e_1, _a;
            try {
                for (var validExpressions_1 = tslib_1.__values(validExpressions), validExpressions_1_1 = validExpressions_1.next(); !validExpressions_1_1.done; validExpressions_1_1 = validExpressions_1.next()) {
                    var _b = tslib_1.__read(validExpressions_1_1.value, 4), expr = _b[0], _1 = _b[1], _2 = _b[2], _3 = _b[3];
                    expect(MathematicalExpression_1.MathematicalExpression.isMathematicalExpression(expr))
                        .toBe(true);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (validExpressions_1_1 && !validExpressions_1_1.done && (_a = validExpressions_1.return)) _a.call(validExpressions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
        it('should reject non-matching values', function () {
            var e_2, _a;
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
                ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var notMathematicalExpression = _c.value;
                    expect(MathematicalExpression_1.MathematicalExpression
                        .isMathematicalExpression(notMathematicalExpression)).toBe(false);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    });
    describe('#serialize', function () {
        it('should serialize basic mathematical expressions', function () {
            var e_3, _a;
            try {
                for (var validExpressions_2 = tslib_1.__values(validExpressions), validExpressions_2_1 = validExpressions_2.next(); !validExpressions_2_1.done; validExpressions_2_1 = validExpressions_2.next()) {
                    var _b = tslib_1.__read(validExpressions_2_1.value, 4), expression = _b[0], serialized = _b[1], expectedNames = _b[2], expectedValues = _b[3];
                    var attributes = new ExpressionAttributes_1.ExpressionAttributes();
                    expect(expression.serialize(attributes)).toBe(serialized);
                    expect(attributes.names).toEqual(expectedNames);
                    expect(attributes.values).toEqual(expectedValues);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (validExpressions_2_1 && !validExpressions_2_1.done && (_a = validExpressions_2.return)) _a.call(validExpressions_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
        });
    });
});
//# sourceMappingURL=MathematicalExpression.spec.js.map