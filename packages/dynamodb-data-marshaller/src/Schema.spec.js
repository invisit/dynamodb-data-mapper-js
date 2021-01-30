"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Schema_1 = require("./Schema");
describe('isSchema', function () {
    it('should reject scalar values', function () {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(['string', 123, true, null, void 0]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var scalar = _c.value;
                expect(Schema_1.isSchema(scalar)).toBe(false);
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
    it('should accept empty objects', function () {
        expect(Schema_1.isSchema({})).toBe(true);
    });
    it('should accept objects whose members are all schema types', function () {
        expect(Schema_1.isSchema({
            foo: { type: 'Binary' },
            bar: { type: 'Boolean' },
            baz: { type: 'String' },
            quux: {
                type: 'Document',
                members: {
                    fizz: { type: 'Set', memberType: 'String' },
                    buzz: {
                        type: 'Tuple',
                        members: [
                            {
                                type: 'List',
                                memberType: { type: 'Set', memberType: 'Number' },
                            },
                            {
                                type: 'Map',
                                memberType: { type: 'Date' },
                            }
                        ]
                    },
                },
            },
        })).toBe(true);
    });
    it('should reject objects whose members are not all schema types', function () {
        expect(Schema_1.isSchema({
            foo: { type: 'Binary' },
            bar: { type: 'Boolean' },
            baz: { type: 'String' },
            quux: 'string',
        })).toBe(false);
    });
});
//# sourceMappingURL=Schema.spec.js.map