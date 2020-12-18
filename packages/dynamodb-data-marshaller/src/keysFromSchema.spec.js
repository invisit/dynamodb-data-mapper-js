"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keysFromSchema_1 = require("./keysFromSchema");
describe('keysFromSchema', function () {
    var schema = {
        partitionKey: {
            type: 'Number',
            keyType: 'HASH',
        },
        createdAt: {
            type: 'Date',
            keyType: 'RANGE',
            indexKeyConfigurations: {
                chronological: 'HASH',
                globalIndex: 'RANGE'
            },
            attributeName: 'timestamp'
        },
        createdBy: {
            type: 'String',
            indexKeyConfigurations: {
                globalIndex: 'HASH',
                localIndex: 'RANGE'
            },
            attributeName: 'creator',
        },
        binaryKey: {
            type: 'Binary',
            indexKeyConfigurations: {
                binaryIndex: 'HASH'
            }
        },
        customKey: {
            type: 'Custom',
            attributeType: 'S',
            marshall: function (str) { return str; },
            unmarshall: function (av) { return av.S; },
            indexKeyConfigurations: {
                binaryIndex: 'RANGE',
            },
        },
        listProp: { type: 'Collection' },
    };
    it('should identify the table keys', function () {
        expect(keysFromSchema_1.keysFromSchema(schema).tableKeys).toEqual({
            partitionKey: 'HASH',
            timestamp: 'RANGE',
        });
    });
    it('should identify any index keys', function () {
        expect(keysFromSchema_1.keysFromSchema(schema).indexKeys).toEqual({
            binaryIndex: {
                binaryKey: 'HASH',
                customKey: 'RANGE'
            },
            chronological: {
                timestamp: 'HASH',
            },
            globalIndex: {
                creator: 'HASH',
                timestamp: 'RANGE',
            },
            localIndex: {
                creator: 'RANGE',
            },
        });
    });
    it('should record the attribute type of any value used as a key', function () {
        expect(keysFromSchema_1.keysFromSchema(schema).attributes).toEqual({
            partitionKey: 'N',
            timestamp: 'N',
            creator: 'S',
            binaryKey: 'B',
            customKey: 'S',
        });
    });
    it('should throw if a custom property does not define an attribute type', function () {
        var schema = {
            customKey: {
                type: 'Custom',
                keyType: 'HASH',
                marshall: function (str) { return str; },
                unmarshall: function (av) { return av.S; },
            },
        };
        expect(function () { return keysFromSchema_1.keysFromSchema(schema); }).toThrow();
    });
});
//# sourceMappingURL=keysFromSchema.spec.js.map