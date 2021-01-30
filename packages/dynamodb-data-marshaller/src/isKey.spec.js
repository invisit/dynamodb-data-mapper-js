"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var isKey_1 = require("./isKey");
var keyableTypes = [
    'Binary',
    'Custom',
    'Date',
    'Number',
    'String',
];
var unkeyableTypes = [
    'Any',
    'Boolean',
    'Collection',
    'Document',
    'Hash',
    'List',
    'Map',
    'Null',
    'Set',
    'Tuple',
];
describe('isKey', function () {
    var e_1, _a, e_2, _b;
    var _loop_1 = function (notKeyType) {
        it("should return false if the field is of type " + notKeyType, function () {
            expect(isKey_1.isKey({ type: notKeyType, keyType: 'HASH' })).toBe(false);
        });
    };
    try {
        for (var unkeyableTypes_1 = tslib_1.__values(unkeyableTypes), unkeyableTypes_1_1 = unkeyableTypes_1.next(); !unkeyableTypes_1_1.done; unkeyableTypes_1_1 = unkeyableTypes_1.next()) {
            var notKeyType = unkeyableTypes_1_1.value;
            _loop_1(notKeyType);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (unkeyableTypes_1_1 && !unkeyableTypes_1_1.done && (_a = unkeyableTypes_1.return)) _a.call(unkeyableTypes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var _loop_2 = function (keyType) {
        it("should return false if the field is of type " + keyType, function () {
            expect(isKey_1.isKey({ type: keyType, keyType: 'HASH' })).toBe(true);
        });
    };
    try {
        for (var keyableTypes_1 = tslib_1.__values(keyableTypes), keyableTypes_1_1 = keyableTypes_1.next(); !keyableTypes_1_1.done; keyableTypes_1_1 = keyableTypes_1.next()) {
            var keyType = keyableTypes_1_1.value;
            _loop_2(keyType);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (keyableTypes_1_1 && !keyableTypes_1_1.done && (_b = keyableTypes_1.return)) _b.call(keyableTypes_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    it('should return true if the field is an index key and the index name was supplied', function () {
        expect(isKey_1.isKey({ type: 'String', indexKeyConfigurations: { foo: 'HASH' } }, 'foo')).toBe(true);
    });
    it('should return false if the field is an index key and no index name was supplied', function () {
        expect(isKey_1.isKey({ type: 'String', indexKeyConfigurations: { foo: 'HASH' } })).toBe(false);
    });
    it('should return false if the field is an index key and a different index name was supplied', function () {
        expect(isKey_1.isKey({ type: 'String', indexKeyConfigurations: { foo: 'HASH' } }, 'bar')).toBe(false);
    });
    it('should return false if the field is a table key and an index name was supplied', function () {
        expect(isKey_1.isKey({ type: 'String', keyType: 'HASH' }, 'foo')).toBe(false);
    });
    it('should return true if the field is both a table and an index key', function () {
        expect(isKey_1.isKey({
            type: 'String',
            keyType: 'HASH',
            indexKeyConfigurations: { foo: 'HASH' }
        }, 'foo')).toBe(true);
    });
});
//# sourceMappingURL=isKey.spec.js.map