"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SchemaType_1 = require("./SchemaType");
describe('isSchemaType', function () {
    it('should reject scalar values', function () {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(['string', 123, true, null, void 0]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var scalar = _c.value;
                expect(SchemaType_1.isSchemaType(scalar)).toBe(false);
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
    it('should accept values with a string `attributeName` property', function () {
        expect(SchemaType_1.isSchemaType({
            type: 'Boolean',
            attributeName: 'boolProp'
        })).toBe(true);
    });
    it('should reject values with a non-string `attributeName` property', function () {
        expect(SchemaType_1.isSchemaType({
            type: 'Boolean',
            attributeName: 123
        })).toBe(false);
    });
    describe('keyable types', function () {
        var e_2, _a;
        var _loop_1 = function (dataType) {
            it("should accept " + dataType + " type declarations with a keyType", function () {
                expect(SchemaType_1.isSchemaType({
                    type: dataType,
                    keyType: 'HASH',
                })).toBe(true);
            });
            it("should reject " + dataType + " type declarations with an unrecognized keyType", function () {
                expect(SchemaType_1.isSchemaType({
                    type: dataType,
                    keyType: 'foo',
                })).toBe(false);
            });
            it("should accept " + dataType + " type declarations with a hash of indexKeyConfigurations", function () {
                expect(SchemaType_1.isSchemaType({
                    type: dataType,
                    indexKeyConfigurations: { foo: 'HASH' },
                })).toBe(true);
            });
            it("should reject " + dataType + " type declarations with a hash of invalid indexKeyConfigurations", function () {
                expect(SchemaType_1.isSchemaType({
                    type: dataType,
                    indexKeyConfigurations: { foo: 'bar', fizz: 'buzz' },
                })).toBe(false);
            });
            it("should reject " + dataType + " type declarations with scalar indexKeyConfiguration", function () {
                var e_3, _a;
                try {
                    for (var _b = (e_3 = void 0, tslib_1.__values(['string', 123, null, true])), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var scalar = _c.value;
                        expect(SchemaType_1.isSchemaType({
                            type: dataType,
                            indexKeyConfigurations: scalar,
                        })).toBe(false);
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
        };
        try {
            for (var _b = tslib_1.__values(['Binary', 'Date', 'Number', 'String']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var dataType = _c.value;
                _loop_1(dataType);
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
    describe('Any types', function () {
        it('should accept Any types', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Any' })).toBe(true);
        });
    });
    describe('Binary types', function () {
        it('should accept Binary types', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Binary' })).toBe(true);
        });
    });
    describe('Boolean types', function () {
        it('should accept Boolean types', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Boolean' })).toBe(true);
        });
    });
    describe('Custom types', function () {
        it('should accept Custom types with a defined marshaller and unmarshaller', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Custom',
                marshall: function () { },
                unmarshall: function () { },
            })).toBe(true);
        });
        it('should reject Custom types without a defined marshaller', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Custom',
                unmarshall: function () { },
            })).toBe(false);
        });
        it('should reject Custom types without a defined unmarshaller', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Custom',
                marshall: function () { },
            })).toBe(false);
        });
    });
    describe('Date types', function () {
        it('should accept Date types', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Date' })).toBe(true);
        });
    });
    describe('Document types', function () {
        it('should accept Document types', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Document',
                members: {
                    str: { type: 'String' }
                },
            })).toBe(true);
        });
        it('should reject Document types with non-SchemaType members', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Document',
                members: {
                    foo: 'bar',
                },
            })).toBe(false);
        });
        it('should reject Document types without declared members', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Document'
            })).toBe(false);
        });
        it('should accept Document types with a valueConstructor', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Document',
                members: {},
                valueConstructor: Date,
            })).toBe(true);
        });
        it('should reject Document types with a non-function valueConstructor', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Document',
                members: {},
                valueConstructor: 'foo',
            })).toBe(false);
        });
    });
    describe('List types', function () {
        it('should accept List types', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'List',
                memberType: { type: 'Boolean' },
            })).toBe(true);
        });
        it('should reject List types without a defined memberType', function () {
            expect(SchemaType_1.isSchemaType({ type: 'List' })).toBe(false);
        });
        it('should reject List types with malformed memberTypes', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'List',
                memberType: 'Boolean',
            })).toBe(false);
        });
    });
    describe('Map types', function () {
        it('should accept Map types', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Map',
                memberType: { type: 'Boolean' },
            })).toBe(true);
        });
        it('should reject Map types without a defined memberType', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Map' })).toBe(false);
        });
        it('should reject Map types with malformed memberTypes', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Map',
                memberType: 'Boolean',
            })).toBe(false);
        });
    });
    describe('Null types', function () {
        it('should accept Null types', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Null' })).toBe(true);
        });
    });
    describe('Number types', function () {
        it('should accept Number types', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Number' })).toBe(true);
        });
    });
    describe('Set types', function () {
        it('should accept StringSet types', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Set', memberType: 'String' }))
                .toBe(true);
        });
        it('should accept NumberSet types', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Set', memberType: 'Number' }))
                .toBe(true);
        });
        it('should accept BinarySet types', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Set', memberType: 'Binary' }))
                .toBe(true);
        });
    });
    describe('String types', function () {
        it('should accept String types', function () {
            expect(SchemaType_1.isSchemaType({ type: 'String' })).toBe(true);
        });
    });
    describe('Tuple types', function () {
        it('should accept Tuple types', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Tuple',
                members: [{ type: 'Boolean' }, { type: 'String' }],
            })).toBe(true);
        });
        it('should reject Tuple types without defined members', function () {
            expect(SchemaType_1.isSchemaType({ type: 'Tuple' })).toBe(false);
        });
        it('should reject Tuple types with malformed members', function () {
            expect(SchemaType_1.isSchemaType({
                type: 'Tuple',
                members: ['Boolean', 'String'],
            })).toBe(false);
        });
    });
    describe('recursive schemas', function () {
        it('should accept valid recursive schemas', function () {
            var document = {};
            document.recursive = {
                type: "Document",
                members: document,
            };
            expect(SchemaType_1.isSchemaType(document.recursive)).toBe(true);
        });
    });
});
//# sourceMappingURL=SchemaType.spec.js.map