"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ConditionExpression_1 = require("./ConditionExpression");
var ExpressionAttributes_1 = require("./ExpressionAttributes");
var AttributePath_1 = require("./AttributePath");
var FunctionExpression_1 = require("./FunctionExpression");
describe('equals', function () {
    it('should return an equality condition predicate', function () {
        var pred = ConditionExpression_1.equals(new AttributePath_1.AttributePath('foo'));
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('Equals');
    });
});
describe('notEquals', function () {
    it('should return an inequality condition predicate', function () {
        var pred = ConditionExpression_1.notEquals(new AttributePath_1.AttributePath('foo'));
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('NotEquals');
    });
});
describe('lessThan', function () {
    it('should return an < condition predicate', function () {
        var pred = ConditionExpression_1.lessThan(new AttributePath_1.AttributePath('foo'));
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('LessThan');
    });
});
describe('lessThanOrEqualTo', function () {
    it('should return an <= condition predicate', function () {
        var pred = ConditionExpression_1.lessThanOrEqualTo(new AttributePath_1.AttributePath('foo'));
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('LessThanOrEqualTo');
    });
});
describe('greaterThan', function () {
    it('should return an > condition predicate', function () {
        var pred = ConditionExpression_1.greaterThan(new AttributePath_1.AttributePath('foo'));
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('GreaterThan');
    });
});
describe('greaterThanOrEqualTo', function () {
    it('should return an >= condition predicate', function () {
        var pred = ConditionExpression_1.greaterThanOrEqualTo(new AttributePath_1.AttributePath('foo'));
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('GreaterThanOrEqualTo');
    });
});
describe('between', function () {
    it('should return a bounded condition predicate', function () {
        var pred = ConditionExpression_1.between(1, 10);
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred).toEqual({
            type: 'Between',
            lowerBound: 1,
            upperBound: 10,
        });
    });
});
describe('inList', function () {
    it('should return a membership condition predicate', function () {
        var pred = ConditionExpression_1.inList('foo', 'bar', 'baz', 'quux');
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred).toEqual({
            type: 'Membership',
            values: [
                'foo',
                'bar',
                'baz',
                'quux',
            ]
        });
    });
});
describe('attributeExists', function () {
    it('should return an attribute_exists function predicate', function () {
        var pred = ConditionExpression_1.attributeExists();
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('Function');
        expect(pred.name).toBe('attribute_exists');
    });
});
describe('attributeNotExists', function () {
    it('should return an attribute_not_exists function predicate', function () {
        var pred = ConditionExpression_1.attributeNotExists();
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('Function');
        expect(pred.name).toBe('attribute_not_exists');
    });
});
describe('attributeType', function () {
    it('should return an attribute_type function predicate', function () {
        var pred = ConditionExpression_1.attributeType('BOOL');
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('Function');
        expect(pred.name).toBe('attribute_type');
        expect(pred.expected).toBe('BOOL');
    });
});
describe('beginsWith', function () {
    it('should return an begins_with function predicate', function () {
        var pred = ConditionExpression_1.beginsWith('prefix');
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('Function');
        expect(pred.name).toBe('begins_with');
        expect(pred.expected).toBe('prefix');
    });
});
describe('contains', function () {
    it('should return an contains function predicate', function () {
        var pred = ConditionExpression_1.contains('substr');
        expect(ConditionExpression_1.isConditionExpressionPredicate(pred)).toBe(true);
        expect(pred.type).toBe('Function');
        expect(pred.name).toBe('contains');
        expect(pred.expected).toBe('substr');
    });
});
describe('isConditionExpressionPredicate', function () {
    it('should return true for a valid predicate', function () {
        expect(ConditionExpression_1.isConditionExpressionPredicate({ type: 'Equals', object: 0 }))
            .toBe(true);
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
                var notPredicate = _c.value;
                expect(ConditionExpression_1.isConditionExpressionPredicate(notPredicate)).toBe(false);
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
describe('isConditionExpressionSubject', function () {
    it('should return true for a string subject', function () {
        expect(ConditionExpression_1.isConditionExpressionSubject({ subject: 'foo' })).toBe(true);
    });
    it('should return true for an AttributePath subject', function () {
        expect(ConditionExpression_1.isConditionExpressionSubject({
            subject: new AttributePath_1.AttributePath('foo.bar[3]'),
        })).toBe(true);
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
                { name: 'foo', arguments: 'bar' },
                { S: 'string' },
                { subject: 123 },
            ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var notSubject = _c.value;
                expect(ConditionExpression_1.isConditionExpressionSubject(notSubject)).toBe(false);
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
describe('isConditionExpression', function () {
    it('should return true for valid expressions', function () {
        expect(ConditionExpression_1.isConditionExpression({
            type: 'Equals',
            subject: 'foo',
            object: 'bar',
        })).toBe(true);
    });
    it('should return true for function expressions', function () {
        expect(ConditionExpression_1.isConditionExpression(new FunctionExpression_1.FunctionExpression('attribute_not_exists', 'foo'))).toBe(true);
    });
    it('should return true for negation expressions', function () {
        expect(ConditionExpression_1.isConditionExpression({
            type: 'Not',
            condition: {
                type: 'Between',
                subject: 'foo',
                lowerBound: 100,
                upperBound: 200,
            }
        })).toBe(true);
    });
    it('should return true for compound expressions', function () {
        var e_3, _a;
        try {
            for (var _b = tslib_1.__values(['And', 'Or']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var type = _c.value;
                expect(ConditionExpression_1.isConditionExpression({
                    type: type,
                    conditions: [
                        {
                            type: 'Between',
                            subject: 'foo',
                            lowerBound: 100,
                            upperBound: 200,
                        },
                        {
                            type: 'Between',
                            subject: 'foo',
                            lowerBound: 400,
                            upperBound: 600,
                        },
                    ]
                })).toBe(true);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    });
    it('should reject compound expressions without a conditions list', function () {
        var e_4, _a;
        try {
            for (var _b = tslib_1.__values(['And', 'Or']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var type = _c.value;
                expect(ConditionExpression_1.isConditionExpression({ type: type })).toBe(false);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
    });
    it('should reject compound expressions whose list contains invalid members', function () {
        var e_5, _a;
        try {
            for (var _b = tslib_1.__values(['And', 'Or']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var type = _c.value;
                expect(ConditionExpression_1.isConditionExpression({
                    type: type,
                    conditions: ['foo', 123],
                })).toBe(false);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
    });
    it('should reject non-matching values', function () {
        var e_6, _a;
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
                { S: 'string' },
                { subject: 'foo', object: 'bar' },
                { type: 'UnknownType', subject: 'foo', object: 'bar' },
            ]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var notExpression = _c.value;
                expect(ConditionExpression_1.isConditionExpression(notExpression)).toBe(false);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    });
});
describe('serializeConditionExpression', function () {
    it('should serialize equality expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({
            type: 'Equals',
            subject: 'foo',
            object: 'bar',
        }, attributes);
        expect(serialized).toBe('#attr0 = :val1');
        expect(attributes.names).toEqual({ '#attr0': 'foo' });
        expect(attributes.values).toEqual({ ':val1': { S: 'bar' } });
    });
    it('should serialize inequality expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({ type: 'NotEquals', subject: 'foo', object: 'bar' }, attributes);
        expect(serialized).toBe('#attr0 <> :val1');
        expect(attributes.names).toEqual({ '#attr0': 'foo' });
        expect(attributes.values).toEqual({ ':val1': { S: 'bar' } });
    });
    it('should serialize less than expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({ type: 'LessThan', subject: 'foo', object: 'bar' }, attributes);
        expect(serialized).toBe('#attr0 < :val1');
        expect(attributes.names).toEqual({ '#attr0': 'foo' });
        expect(attributes.values).toEqual({ ':val1': { S: 'bar' } });
    });
    it('should serialize greater than expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({
            type: 'GreaterThan',
            subject: 'foo',
            object: new FunctionExpression_1.FunctionExpression('size', new AttributePath_1.AttributePath('bar')),
        }, attributes);
        expect(serialized).toBe('#attr0 > size(#attr1)');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr1': 'bar'
        });
        expect(attributes.values).toEqual({});
    });
    it('should serialize less than or equal to expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({
            type: 'LessThanOrEqualTo',
            subject: 'foo',
            object: 'bar',
        }, attributes);
        expect(serialized).toBe('#attr0 <= :val1');
        expect(attributes.names).toEqual({ '#attr0': 'foo' });
        expect(attributes.values).toEqual({ ':val1': { S: 'bar' } });
    });
    it('should serialize greater than or equal to expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({
            type: 'GreaterThanOrEqualTo',
            subject: 'foo',
            object: new AttributePath_1.AttributePath('bar'),
        }, attributes);
        expect(serialized).toBe('#attr0 >= #attr1');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr1': 'bar',
        });
        expect(attributes.values).toEqual({});
    });
    it('should serialize bounding expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({
            type: 'Between',
            subject: 'foo',
            lowerBound: 1,
            upperBound: 10,
        }, attributes);
        expect(serialized).toBe('#attr0 BETWEEN :val1 AND :val2');
        expect(attributes.names).toEqual({ '#attr0': 'foo' });
        expect(attributes.values).toEqual({
            ':val1': { N: '1' },
            ':val2': { N: '10' },
        });
    });
    it('should serialize membership expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({
            type: 'Membership',
            subject: 'foo',
            values: [
                1,
                10,
                100,
            ],
        }, attributes);
        expect(serialized).toBe('#attr0 IN (:val1, :val2, :val3)');
        expect(attributes.names).toEqual({ '#attr0': 'foo' });
        expect(attributes.values).toEqual({
            ':val1': { N: '1' },
            ':val2': { N: '10' },
            ':val3': { N: '100' },
        });
    });
    describe('function expressions', function () {
        it('should serialize attribute_exists expressions', function () {
            var attributes = new ExpressionAttributes_1.ExpressionAttributes();
            var serialized = ConditionExpression_1.serializeConditionExpression({ type: 'Function', subject: 'foo', name: 'attribute_exists' }, attributes);
            expect(serialized).toBe('attribute_exists(#attr0)');
            expect(attributes.names).toEqual({ '#attr0': 'foo' });
            expect(attributes.values).toEqual({});
        });
        it('should serialize attribute_not_exists expressions', function () {
            var attributes = new ExpressionAttributes_1.ExpressionAttributes();
            var serialized = ConditionExpression_1.serializeConditionExpression({ type: 'Function', subject: 'foo', name: 'attribute_not_exists' }, attributes);
            expect(serialized).toBe('attribute_not_exists(#attr0)');
            expect(attributes.names).toEqual({ '#attr0': 'foo' });
            expect(attributes.values).toEqual({});
        });
        it('should serialize attribute_type expressions', function () {
            var attributes = new ExpressionAttributes_1.ExpressionAttributes();
            var serialized = ConditionExpression_1.serializeConditionExpression({
                type: 'Function',
                subject: 'foo',
                name: 'attribute_type',
                expected: 'S'
            }, attributes);
            expect(serialized).toBe('attribute_type(#attr0, :val1)');
            expect(attributes.names).toEqual({ '#attr0': 'foo' });
            expect(attributes.values).toEqual({ ':val1': { S: 'S' } });
        });
        it('should serialize begins_with expressions', function () {
            var attributes = new ExpressionAttributes_1.ExpressionAttributes();
            var serialized = ConditionExpression_1.serializeConditionExpression({
                type: 'Function',
                subject: 'foo',
                name: 'begins_with',
                expected: 'prefix'
            }, attributes);
            expect(serialized).toBe('begins_with(#attr0, :val1)');
            expect(attributes.names).toEqual({ '#attr0': 'foo' });
            expect(attributes.values).toEqual({ ':val1': { S: 'prefix' } });
        });
        it('should serialize contains expressions', function () {
            var attributes = new ExpressionAttributes_1.ExpressionAttributes();
            var serialized = ConditionExpression_1.serializeConditionExpression({
                type: 'Function',
                subject: 'foo',
                name: 'contains',
                expected: 'substr'
            }, attributes);
            expect(serialized).toBe('contains(#attr0, :val1)');
            expect(attributes.names).toEqual({ '#attr0': 'foo' });
            expect(attributes.values).toEqual({ ':val1': { S: 'substr' } });
        });
    });
    it('should serialize negation expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({
            type: 'Not',
            condition: {
                type: 'Between',
                subject: 'foo',
                lowerBound: 1,
                upperBound: 10,
            }
        }, attributes);
        expect(serialized).toBe('NOT (#attr0 BETWEEN :val1 AND :val2)');
        expect(attributes.names).toEqual({ '#attr0': 'foo' });
        expect(attributes.values).toEqual({
            ':val1': { N: '1' },
            ':val2': { N: '10' },
        });
    });
    it('should serialize and expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({
            type: 'And',
            conditions: [
                {
                    type: 'GreaterThanOrEqualTo',
                    subject: 'foo',
                    object: 1,
                },
                {
                    type: 'LessThan',
                    subject: 'foo',
                    object: 10,
                },
                {
                    type: 'Equals',
                    subject: 'fizz',
                    object: 'buzz',
                }
            ]
        }, attributes);
        expect(serialized).toBe('(#attr0 >= :val1) AND (#attr0 < :val2) AND (#attr3 = :val4)');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
            '#attr3': 'fizz',
        });
        expect(attributes.values).toEqual({
            ':val1': { N: '1' },
            ':val2': { N: '10' },
            ':val4': { S: 'buzz' },
        });
    });
    it('should serialize single-clause and expressions as the underlying expression type', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({
            type: 'And',
            conditions: [
                {
                    type: 'Membership',
                    subject: 'foo',
                    values: [
                        1,
                        10,
                        100,
                    ],
                },
            ]
        }, attributes);
        expect(serialized).toBe('#attr0 IN (:val1, :val2, :val3)');
        expect(attributes.names).toEqual({ '#attr0': 'foo' });
        expect(attributes.values).toEqual({
            ':val1': { N: '1' },
            ':val2': { N: '10' },
            ':val3': { N: '100' },
        });
    });
    it('should serialize or expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression({
            type: 'Or',
            conditions: [
                {
                    type: 'GreaterThanOrEqualTo',
                    subject: 'foo',
                    object: 10,
                },
                {
                    type: 'LessThan',
                    subject: 'foo',
                    object: 1,
                }
            ]
        }, attributes);
        expect(serialized).toBe('(#attr0 >= :val1) OR (#attr0 < :val2)');
        expect(attributes.names).toEqual({
            '#attr0': 'foo',
        });
        expect(attributes.values).toEqual({
            ':val1': { N: '10' },
            ':val2': { N: '1' },
        });
    });
    it('should serialize function expressions', function () {
        var attributes = new ExpressionAttributes_1.ExpressionAttributes();
        var serialized = ConditionExpression_1.serializeConditionExpression(new FunctionExpression_1.FunctionExpression('attribute_type', new AttributePath_1.AttributePath('foo'), 'S'), attributes);
        expect(serialized).toBe('attribute_type(#attr0, :val1)');
        expect(attributes.names).toEqual({ '#attr0': 'foo' });
        expect(attributes.values).toEqual({ ':val1': { S: 'S' } });
    });
});
//# sourceMappingURL=ConditionExpression.spec.js.map