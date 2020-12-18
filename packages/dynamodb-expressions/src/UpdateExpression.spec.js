"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UpdateExpression_1 = require("./UpdateExpression");
var ExpressionAttributes_1 = require("./ExpressionAttributes");
var AttributePath_1 = require("./AttributePath");
var FunctionExpression_1 = require("./FunctionExpression");
var MathematicalExpression_1 = require("./MathematicalExpression");
var AttributeValue_1 = require("./AttributeValue");
describe('UpdateExpression', function () {
    it('should serialize ADD clauses', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var expr = new UpdateExpression_1.UpdateExpression();
        expr.add('foo', new Set(['bar', 'baz']));
        expr.add('fizz', 1);
        expect(expr.serialize(attributes))
            .toBe('ADD #attr0 :val1, #attr2 :val3');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr2': 'fizz',
        });
        expect(attributes.values).toEqual({
            ':val1': { SS: ['bar', 'baz'] },
            ':val3': { N: '1' },
        });
    });
    it('should serialize DELETE clauses', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var expr = new UpdateExpression_1.UpdateExpression();
        expr.delete('foo', new Set(['bar', 'baz']));
        expr.delete('fizz', 1);
        expect(expr.serialize(attributes))
            .toBe('DELETE #attr0 :val1, #attr2 :val3');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr2': 'fizz',
        });
        expect(attributes.values).toEqual({
            ':val1': { SS: ['bar', 'baz'] },
            ':val3': { N: '1' },
        });
    });
    it('should serialize REMOVE clauses', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var expr = new UpdateExpression_1.UpdateExpression();
        expr.remove('foo');
        expr.remove('fizz');
        expect(expr.serialize(attributes)).toBe('REMOVE #attr0, #attr1');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr1': 'fizz',
        });
        expect(attributes.values).toEqual({});
    });
    it('should serialize SET clauses', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var expr = new UpdateExpression_1.UpdateExpression();
        expr.set('foo', new Set(['bar', 'baz']));
        expr.set('fizz', 1);
        expect(expr.serialize(attributes))
            .toBe('SET #attr0 = :val1, #attr2 = :val3');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr2': 'fizz',
        });
        expect(attributes.values).toEqual({
            ':val1': { SS: ['bar', 'baz'] },
            ':val3': { N: '1' },
        });
    });
    it('should serialize SET clauses with function expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var expr = new UpdateExpression_1.UpdateExpression();
        expr.set('foo', new FunctionExpression_1.FunctionExpression('list_append', new AttributePath_1.AttributePath('foo'), 'bar'));
        expect(expr.serialize(attributes))
            .toBe('SET #attr0 = list_append(#attr0, :val1)');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
        });
        expect(attributes.values).toEqual({
            ':val1': { S: 'bar' },
        });
    });
    it('should serialize SET clauses with mathematical expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var expr = new UpdateExpression_1.UpdateExpression();
        expr.set('foo', new MathematicalExpression_1.MathematicalExpression(new AttributePath_1.AttributePath('foo'), '+', 1));
        expect(expr.serialize(attributes)).toBe('SET #attr0 = #attr0 + :val1');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
        });
        expect(attributes.values).toEqual({
            ':val1': { N: '1' },
        });
    });
    it('should serialize SET clauses with marshalled AttributeValues', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var expr = new UpdateExpression_1.UpdateExpression();
        expr.set('foo', new AttributeValue_1.AttributeValue({ SS: ['bar', 'baz'] }));
        expr.set('fizz', new AttributeValue_1.AttributeValue({ N: '1' }));
        expect(expr.serialize(attributes))
            .toBe('SET #attr0 = :val1, #attr2 = :val3');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr2': 'fizz',
        });
        expect(attributes.values).toEqual({
            ':val1': { SS: ['bar', 'baz'] },
            ':val3': { N: '1' },
        });
    });
    it('should serialize expressions with multiple clauses', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var expr = new UpdateExpression_1.UpdateExpression();
        expr.add('foo', new Set(['baz']));
        expr.delete('foo', new Set(['quux']));
        expr.remove('fizz');
        expr.set('buzz', new Set(['pop']));
        expect(expr.serialize(attributes)).toBe('ADD #attr0 :val1 DELETE #attr0 :val2 SET #attr3 = :val4 REMOVE #attr5');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr3': 'buzz',
            '#attr5': 'fizz',
        });
        expect(attributes.values).toEqual({
            ':val1': { SS: ['baz'] },
            ':val2': { SS: ['quux'] },
            ':val4': { SS: ['pop'] },
        });
    });
    // it('should support injecting an instance of ExpressionAttributes', () => {
    //     const attributes = new ExpressionAttributes();
    //     const expr = new UpdateExpression({attributes});
    //     expr.remove('foo');
    //     expr.serialize(attributes);
    //
    //     expect(attributes.names).toEqual({'#attr0': 'foo'});
    // });
});
//# sourceMappingURL=UpdateExpression.spec.js.map