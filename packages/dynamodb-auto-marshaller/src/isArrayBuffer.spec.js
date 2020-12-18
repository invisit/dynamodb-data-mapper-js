"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var isArrayBuffer_1 = require("./isArrayBuffer");
describe('isArrayBuffer', function () {
    var arrayBufferConstructor = ArrayBuffer;
    afterEach(function () {
        ArrayBuffer = arrayBufferConstructor;
    });
    it('should return true for ArrayBuffer objects', function () {
        expect(isArrayBuffer_1.isArrayBuffer(new ArrayBuffer(0))).toBe(true);
    });
    it('should return false for ArrayBufferView objects', function () {
        var view = new Uint8Array(0);
        expect(isArrayBuffer_1.isArrayBuffer(view)).toBe(false);
        expect(isArrayBuffer_1.isArrayBuffer(view.buffer)).toBe(true);
    });
    it('should return false for scalar values', function () {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(['string', 123.234, true, null, void 0]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var scalar = _c.value;
                expect(isArrayBuffer_1.isArrayBuffer(scalar)).toBe(false);
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
    it('should return true for ArrayBuffers created with a different instance of the ArrayBuffer constructor', function () {
        var buffer = new ArrayBuffer(0);
        ArrayBuffer = function () { return buffer; };
        expect(buffer).not.toBeInstanceOf(ArrayBuffer);
        expect(isArrayBuffer_1.isArrayBuffer(buffer)).toBe(true);
    });
});
//# sourceMappingURL=isArrayBuffer.spec.js.map