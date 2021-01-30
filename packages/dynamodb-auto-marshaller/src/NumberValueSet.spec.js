"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NumberValue_1 = require("./NumberValue");
var NumberValueSet_1 = require("./NumberValueSet");
describe('NumberValueSet', function () {
    it('should create a set with values provided to the constructor', function () {
        var set = new NumberValueSet_1.NumberValueSet([
            new NumberValue_1.NumberValue('1'),
            new NumberValue_1.NumberValue('2'),
        ]);
        expect(set.size).toBe(2);
        expect(set.has(new NumberValue_1.NumberValue('1'))).toBe(true);
        expect(set.has(new NumberValue_1.NumberValue('2'))).toBe(true);
        expect(set.has(new NumberValue_1.NumberValue('3'))).toBe(false);
    });
    describe('#add', function () {
        it('should add new values to the set', function () {
            var set = new NumberValueSet_1.NumberValueSet([
                new NumberValue_1.NumberValue('1'),
                new NumberValue_1.NumberValue('2'),
            ]);
            expect(set.has(new NumberValue_1.NumberValue('3'))).toBe(false);
            set.add(new NumberValue_1.NumberValue('3'));
            expect(set.has(new NumberValue_1.NumberValue('3'))).toBe(true);
        });
        it('should be a no-op if the value is already in the set', function () {
            var set = new NumberValueSet_1.NumberValueSet([new NumberValue_1.NumberValue('3')]);
            expect(set.size).toBe(1);
            set.add(new NumberValue_1.NumberValue('3'));
            expect(set.size).toBe(1);
        });
        it('should allow adding number primitives', function () {
            var set = new NumberValueSet_1.NumberValueSet([new NumberValue_1.NumberValue('3')]);
            expect(set.size).toBe(1);
            set.add(3);
            expect(set.size).toBe(1);
            expect(set.has(3)).toBe(true);
            expect(set.has(new NumberValue_1.NumberValue('3'))).toBe(true);
            set.add(4);
            expect(set.size).toBe(2);
            expect(set.has(4)).toBe(true);
            expect(set.has(new NumberValue_1.NumberValue('4'))).toBe(true);
        });
    });
    describe('#clear', function () {
        it('should drop all values', function () {
            var set = new NumberValueSet_1.NumberValueSet([
                new NumberValue_1.NumberValue('1'),
                new NumberValue_1.NumberValue('2'),
            ]);
            set.clear();
            expect(set.size).toBe(0);
        });
    });
    describe('#delete', function () {
        it('should return `true` and remove the provided value if it was found in the set', function () {
            var set = new NumberValueSet_1.NumberValueSet([
                new NumberValue_1.NumberValue('1'),
                new NumberValue_1.NumberValue('2'),
            ]);
            expect(set.delete(new NumberValue_1.NumberValue('1'))).toBe(true);
            expect(set.size).toBe(1);
            expect(set.has(new NumberValue_1.NumberValue('1'))).toBe(false);
        });
        it('should return false and be a no-op if the value is not in the set', function () {
            var set = new NumberValueSet_1.NumberValueSet([
                new NumberValue_1.NumberValue('1'),
                new NumberValue_1.NumberValue('2'),
            ]);
            expect(set.delete(new NumberValue_1.NumberValue('3'))).toBe(false);
            expect(set.size).toBe(2);
        });
    });
    describe('#entries', function () {
        it('should provide a [key, value] iterable where the key and value are the same (in line with ES6 Set behavior)', function () {
            var e_1, _a;
            var set = new NumberValueSet_1.NumberValueSet([
                new NumberValue_1.NumberValue('1'),
                new NumberValue_1.NumberValue('2'),
            ]);
            try {
                for (var _b = tslib_1.__values(set.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = tslib_1.__read(_c.value, 2), key = _d[0], value = _d[1];
                    expect(key).toBe(value);
                    expect(set.has(value)).toBe(true);
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
    describe('#forEach', function () {
        it('should invoke a callback for each value in the set', function () {
            var set = new NumberValueSet_1.NumberValueSet([
                new NumberValue_1.NumberValue('1'),
                new NumberValue_1.NumberValue('2'),
            ]);
            var otherSet = new NumberValueSet_1.NumberValueSet();
            set.forEach(otherSet.add, otherSet);
            expect(otherSet.size).toBe(set.size);
        });
    });
    describe('#keys', function () {
        it('should iterate over all values in the set (in line with ES6 Set behavior)', function () {
            var e_2, _a;
            var set = new NumberValueSet_1.NumberValueSet([
                new NumberValue_1.NumberValue('1'),
                new NumberValue_1.NumberValue('2'),
            ]);
            var iterations = 0;
            try {
                for (var _b = tslib_1.__values(set.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    expect(set.has(key)).toBe(true);
                    iterations++;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            expect(iterations).toBe(set.size);
        });
    });
    describe('#values', function () {
        it('should iterate over all values in the set', function () {
            var e_3, _a;
            var set = new NumberValueSet_1.NumberValueSet([
                new NumberValue_1.NumberValue('1'),
                new NumberValue_1.NumberValue('2'),
            ]);
            var iterations = 0;
            try {
                for (var _b = tslib_1.__values(set.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    expect(set.has(key)).toBe(true);
                    iterations++;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            expect(iterations).toBe(set.size);
        });
    });
    describe('#[Symbol.iterator]', function () {
        it('should iterate over all values in the set', function () {
            var e_4, _a;
            var set = new NumberValueSet_1.NumberValueSet([
                new NumberValue_1.NumberValue('1'),
                new NumberValue_1.NumberValue('2'),
            ]);
            var iterations = 0;
            try {
                for (var set_1 = tslib_1.__values(set), set_1_1 = set_1.next(); !set_1_1.done; set_1_1 = set_1.next()) {
                    var key = set_1_1.value;
                    expect(set.has(key)).toBe(true);
                    iterations++;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (set_1_1 && !set_1_1.done && (_a = set_1.return)) _a.call(set_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            expect(iterations).toBe(set.size);
        });
    });
    describe('#[Symbol.toStringTag]', function () {
        it('should return a static value of "Set"', function () {
            expect(new NumberValueSet_1.NumberValueSet()[Symbol.toStringTag]).toBe('Set');
        });
        it('should cause toString to return a Set-identifying string', function () {
            expect(Object.prototype.toString.call(new NumberValueSet_1.NumberValueSet()))
                .toBe('[object Set]');
        });
    });
});
//# sourceMappingURL=NumberValueSet.spec.js.map