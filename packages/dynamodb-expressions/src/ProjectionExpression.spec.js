"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttributePath_1 = require("./AttributePath");
var ExpressionAttributes_1 = require("./ExpressionAttributes");
var ProjectionExpression_1 = require("./ProjectionExpression");
describe('ProjectionExpression', function () {
    it('should allow the addition of scalar values', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        expect(ProjectionExpression_1.serializeProjectionExpression(['foo', 'bar', 'baz', 'quux'], attributes)).toBe('#attr0, #attr1, #attr2, #attr3');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr1': 'bar',
            '#attr2': 'baz',
            '#attr3': 'quux',
        });
    });
    it('should allow the addition of list index dereferences', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        expect(ProjectionExpression_1.serializeProjectionExpression([new AttributePath_1.AttributePath('foo[2]')], attributes)).toBe('#attr0[2]');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
        });
    });
    it('should allow the addition of nested attributes', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        expect(ProjectionExpression_1.serializeProjectionExpression([new AttributePath_1.AttributePath('foo.bar')], attributes)).toBe('#attr0.#attr1');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr1': 'bar',
        });
    });
    it('should allow the nesting of complex attributes to an arbitrary depth', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        expect(ProjectionExpression_1.serializeProjectionExpression([new AttributePath_1.AttributePath('snap.foo[2].bar[3].baz[4].quux')], attributes)).toBe('#attr0.#attr1[2].#attr2[3].#attr3[4].#attr4');
        expect(attributes.names).toEqual({
            '#attr0': 'snap',
            '#attr1': 'foo',
            '#attr2': 'bar',
            '#attr3': 'baz',
            '#attr4': 'quux',
        });
    });
});
//# sourceMappingURL=ProjectionExpression.spec.js.map