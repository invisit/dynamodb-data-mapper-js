"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var itemIdentifier_1 = require("./itemIdentifier");
describe('itemIdentifier', function () {
    it('should serialize all top-level string attributes', function () {
        expect(itemIdentifier_1.itemIdentifier('table', { DeleteRequest: { Key: { foo: { S: 'bar' } } } })).toBe('table::delete::foo=bar');
        expect(itemIdentifier_1.itemIdentifier('table', { PutRequest: { Item: { foo: { S: 'bar' } } } })).toBe('table::put::foo=bar');
    });
    it('should serialize all top-level number attributes', function () {
        expect(itemIdentifier_1.itemIdentifier('table', { DeleteRequest: { Key: { foo: { N: '1' } } } })).toBe('table::delete::foo=1');
        expect(itemIdentifier_1.itemIdentifier('table', { PutRequest: { Item: { foo: { N: '1' } } } })).toBe('table::put::foo=1');
    });
    it('should serialize all top-level binary attributes', function () {
        expect(itemIdentifier_1.itemIdentifier('table', { DeleteRequest: { Key: { foo: { B: Uint8Array.from([0xde, 0xad]) } } } })).toBe('table::delete::foo=222,173');
        expect(itemIdentifier_1.itemIdentifier('table', { PutRequest: { Item: { foo: { B: Uint8Array.from([0xde, 0xad]) } } } })).toBe('table::put::foo=222,173');
    });
    it('should serialize different representations of the same binary data in the same way', function () {
        expect(itemIdentifier_1.itemIdentifier('table', { DeleteRequest: { Key: { foo: { B: '🐎👱❤' } } } })).toBe(itemIdentifier_1.itemIdentifier('table', { DeleteRequest: { Key: { foo: { B: Uint8Array.from([240, 159, 144, 142, 240, 159, 145, 177, 226, 157, 164]) } } } }));
        expect(itemIdentifier_1.itemIdentifier('table', { DeleteRequest: { Key: { foo: { B: '🐎👱❤' } } } })).toBe(itemIdentifier_1.itemIdentifier('table', { DeleteRequest: { Key: { foo: { B: Uint8Array.from([240, 159, 144, 142, 240, 159, 145, 177, 226, 157, 164]).buffer } } } }));
    });
    it('should throw when an invalid binary value is provided', function () {
        expect(function () { return itemIdentifier_1.itemIdentifier('table', { PutRequest: { Item: { foo: { B: [] } } } }); }).toThrow();
    });
    it('should throw when neither a PutRequest nor a DeleteRequest is provided', function () {
        expect(function () { return itemIdentifier_1.itemIdentifier('table', {}); }).toThrow();
    });
});
//# sourceMappingURL=itemIdentifier.spec.js.map