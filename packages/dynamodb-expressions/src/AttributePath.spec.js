"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AttributePath_1 = require("./AttributePath");
describe('AttributePath', function () {
    it('should convert a string path to a list of elements', function () {
        expect(new AttributePath_1.AttributePath('foo.bar.baz[3][4][2].fizz[0].buzz[1]').elements).toEqual([
            { type: 'AttributeName', name: 'foo' },
            { type: 'AttributeName', name: 'bar' },
            { type: 'AttributeName', name: 'baz' },
            { type: 'ListIndex', index: 3 },
            { type: 'ListIndex', index: 4 },
            { type: 'ListIndex', index: 2 },
            { type: 'AttributeName', name: 'fizz' },
            { type: 'ListIndex', index: 0 },
            { type: 'AttributeName', name: 'buzz' },
            { type: 'ListIndex', index: 1 },
        ]);
    });
    it('should clone an iterable of elements passed to the constructor', function () {
        var elements = [
            { type: 'AttributeName', name: 'foo' },
            { type: 'AttributeName', name: 'bar' },
            { type: 'AttributeName', name: 'baz' },
            { type: 'ListIndex', index: 3 },
            { type: 'ListIndex', index: 4 },
            { type: 'ListIndex', index: 2 },
            { type: 'AttributeName', name: 'fizz' },
            { type: 'ListIndex', index: 0 },
            { type: 'AttributeName', name: 'buzz' },
            { type: 'ListIndex', index: 1 },
        ];
        var path = new AttributePath_1.AttributePath(elements);
        expect(path.elements).toEqual(elements);
        expect(path.elements).not.toBe(elements);
        elements.shift();
        expect(path.elements).not.toEqual(elements);
        expect(path.elements.slice(1)).toEqual(elements);
    });
    it('should allow attribute names with embedded control characters', function () {
        expect(new AttributePath_1.AttributePath('_bracket_\\[_period_\\._backslash_\\\\_unescaped_backslash_\\_.foo').elements).toEqual([
            { type: 'AttributeName', name: '_bracket_[_period_._backslash_\\_unescaped_backslash_\\_' },
            { type: 'AttributeName', name: 'foo' },
        ]);
    });
    describe('path correctness checking', function () {
        it('should throw an error when a path begins with a control character', function () {
            expect(function () { return new AttributePath_1.AttributePath('[1]'); })
                .toThrowError(/Invalid control character/);
        });
        it('should throw an error when a list index access contains invalid characters', function () {
            expect(function () { return new AttributePath_1.AttributePath('foo[a]'); })
                .toThrowError(/Invalid array index character/);
        });
        it('should throw an error when a list index access contains no characters', function () {
            expect(function () { return new AttributePath_1.AttributePath('foo[]'); })
                .toThrowError(/Invalid array index/);
        });
        it('should throw an error when an identifier immediately follows a list index access', function () {
            expect(function () { return new AttributePath_1.AttributePath('foo[1]a'); })
                .toThrowError(/Bare identifier encountered/);
        });
    });
    describe('::isAttributePath', function () {
        var ctor = AttributePath_1.AttributePath;
        afterEach(function () {
            AttributePath_1.AttributePath = ctor;
        });
        it('should return true for AttributePath objects', function () {
            expect(AttributePath_1.AttributePath.isAttributePath(new AttributePath_1.AttributePath('foo'))).toBe(true);
        });
        it('should return false for scalar values', function () {
            var e_1, _a;
            try {
                for (var _b = tslib_1.__values(['string', 123.234, true, null, void 0]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var scalar = _c.value;
                    expect(AttributePath_1.AttributePath.isAttributePath(scalar)).toBe(false);
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
        it('should return true for AttributePaths created with a different instance of the AttributePath constructor', function () {
            var isAttributePath = AttributePath_1.AttributePath.isAttributePath;
            var path = new AttributePath_1.AttributePath('foo.bar');
            AttributePath_1.AttributePath = function () { return path; };
            expect(path).not.toBeInstanceOf(AttributePath_1.AttributePath);
            expect(isAttributePath(path)).toBe(true);
        });
    });
});
//# sourceMappingURL=AttributePath.spec.js.map