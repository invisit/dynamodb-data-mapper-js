"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = require(".");
describe('ScanPaginator', function () {
    var promiseFunc = jest.fn();
    var mockDynamoDbClient = {
        config: {},
        scan: jest.fn()
    };
    beforeEach(function () {
        promiseFunc.mockClear();
        promiseFunc.mockImplementation(function () { return Promise.resolve({ Items: [] }); });
        mockDynamoDbClient.scan.mockClear();
        mockDynamoDbClient.scan.mockImplementation(function () {
            return { promise: promiseFunc };
        });
    });
    it('should paginate over results and return a promise for each item', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result, _a, _b, res, e_1_1;
        var e_1, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'snap' },
                                bar: { NS: ['1', '2', '3'] },
                                baz: { L: [{ BOOL: true }, { N: '4' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'snap' } },
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'crackle' },
                                bar: { NS: ['5', '6', '7'] },
                                baz: { L: [{ BOOL: false }, { N: '8' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'crackle' } },
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'pop' },
                                bar: { NS: ['9', '12', '30'] },
                                baz: { L: [{ BOOL: true }, { N: '24' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'pop' } },
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({}); });
                    result = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 12]);
                    _a = tslib_1.__asyncValues(new _1.ScanPaginator(mockDynamoDbClient, { TableName: 'foo' }));
                    _d.label = 2;
                case 2: return [4 /*yield*/, _a.next()];
                case 3:
                    if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 5];
                    res = _b.value;
                    result.push.apply(result, tslib_1.__spread(res.Items || []));
                    _d.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _d.trys.push([7, , 10, 11]);
                    if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _c.call(_a)];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(result).toEqual([
                        {
                            fizz: { S: 'snap' },
                            bar: { NS: ['1', '2', '3'] },
                            baz: { L: [{ BOOL: true }, { N: '4' }] }
                        },
                        {
                            fizz: { S: 'crackle' },
                            bar: { NS: ['5', '6', '7'] },
                            baz: { L: [{ BOOL: false }, { N: '8' }] }
                        },
                        {
                            fizz: { S: 'pop' },
                            bar: { NS: ['9', '12', '30'] },
                            baz: { L: [{ BOOL: true }, { N: '24' }] }
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should provide access to the last evaluated key', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var paginator, expectedLastKeys, paginator_1, paginator_1_1, _2, e_2_1;
        var e_2, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'snap' },
                                bar: { NS: ['1', '2', '3'] },
                                baz: { L: [{ BOOL: true }, { N: '4' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'snap' } },
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'crackle' },
                                bar: { NS: ['5', '6', '7'] },
                                baz: { L: [{ BOOL: false }, { N: '8' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'crackle' } },
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'pop' },
                                bar: { NS: ['9', '12', '30'] },
                                baz: { L: [{ BOOL: true }, { N: '24' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'pop' } },
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({}); });
                    paginator = new _1.ScanPaginator(mockDynamoDbClient, { TableName: 'foo' });
                    expectedLastKeys = [
                        { fizz: { S: 'snap' } },
                        { fizz: { S: 'crackle' } },
                        { fizz: { S: 'pop' } },
                    ];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    paginator_1 = tslib_1.__asyncValues(paginator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, paginator_1.next()];
                case 3:
                    if (!(paginator_1_1 = _b.sent(), !paginator_1_1.done)) return [3 /*break*/, 5];
                    _2 = paginator_1_1.value;
                    expect(paginator.lastEvaluatedKey).toEqual(expectedLastKeys.shift());
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(paginator_1_1 && !paginator_1_1.done && (_a = paginator_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(paginator_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(paginator.lastEvaluatedKey).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should merge counts', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var paginator, expectedCount, expectedScanCounts, paginator_2, paginator_2_1, _3, e_3_1;
        var e_3, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'snap' },
                                bar: { NS: ['1', '2', '3'] },
                                baz: { L: [{ BOOL: true }, { N: '4' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'snap' } },
                        Count: 1,
                        ScannedCount: 1
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'crackle' },
                                bar: { NS: ['5', '6', '7'] },
                                baz: { L: [{ BOOL: false }, { N: '8' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'crackle' } },
                        Count: 1,
                        ScannedCount: 2,
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'pop' },
                                bar: { NS: ['9', '12', '30'] },
                                baz: { L: [{ BOOL: true }, { N: '24' }] }
                            },
                        ],
                        Count: 1,
                        ScannedCount: 3
                    }); });
                    paginator = new _1.ScanPaginator(mockDynamoDbClient, { TableName: 'foo' });
                    expectedCount = 0;
                    expectedScanCounts = [1, 3, 6];
                    expect(paginator.count).toBe(expectedCount);
                    expect(paginator.scannedCount).toBe(expectedCount);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    paginator_2 = tslib_1.__asyncValues(paginator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, paginator_2.next()];
                case 3:
                    if (!(paginator_2_1 = _b.sent(), !paginator_2_1.done)) return [3 /*break*/, 5];
                    _3 = paginator_2_1.value;
                    expect(paginator.count).toBe(++expectedCount);
                    expect(paginator.scannedCount).toBe(expectedScanCounts.shift());
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(paginator_2_1 && !paginator_2_1.done && (_a = paginator_2.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(paginator_2)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(paginator.count).toBe(3);
                    expect(paginator.scannedCount).toBe(6);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should merge consumed capacity reports', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var paginator, paginator_3, paginator_3_1, _4, e_4_1;
        var e_4, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'snap' },
                                bar: { NS: ['1', '2', '3'] },
                                baz: { L: [{ BOOL: true }, { N: '4' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'snap' } },
                        ConsumedCapacity: {
                            TableName: 'foo',
                            CapacityUnits: 2
                        }
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'crackle' },
                                bar: { NS: ['5', '6', '7'] },
                                baz: { L: [{ BOOL: false }, { N: '8' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'crackle' } },
                        ConsumedCapacity: {
                            TableName: 'foo',
                            CapacityUnits: 2
                        }
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'pop' },
                                bar: { NS: ['9', '12', '30'] },
                                baz: { L: [{ BOOL: true }, { N: '24' }] }
                            },
                        ],
                        ConsumedCapacity: {
                            TableName: 'foo',
                            CapacityUnits: 2
                        }
                    }); });
                    paginator = new _1.ScanPaginator(mockDynamoDbClient, { TableName: 'foo' });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    paginator_3 = tslib_1.__asyncValues(paginator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, paginator_3.next()];
                case 3:
                    if (!(paginator_3_1 = _b.sent(), !paginator_3_1.done)) return [3 /*break*/, 5];
                    _4 = paginator_3_1.value;
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(paginator_3_1 && !paginator_3_1.done && (_a = paginator_3.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(paginator_3)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(paginator.consumedCapacity).toEqual({
                        TableName: 'foo',
                        CapacityUnits: 6
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should report the last evaluated key even after ceasing iteration', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var i, paginator, paginator_4, paginator_4_1, _5, e_5_1;
        var e_5, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'snap' },
                                bar: { NS: ['1', '2', '3'] },
                                baz: { L: [{ BOOL: true }, { N: '4' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'snap' } },
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'crackle' },
                                bar: { NS: ['5', '6', '7'] },
                                baz: { L: [{ BOOL: false }, { N: '8' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'crackle' } },
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'pop' },
                                bar: { NS: ['9', '12', '30'] },
                                baz: { L: [{ BOOL: true }, { N: '24' }] }
                            },
                        ],
                        LastEvaluatedKey: { fizz: { S: 'pop' } },
                    }); });
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({}); });
                    i = 0;
                    paginator = new _1.ScanPaginator(mockDynamoDbClient, { TableName: 'foo' });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    paginator_4 = tslib_1.__asyncValues(paginator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, paginator_4.next()];
                case 3:
                    if (!(paginator_4_1 = _b.sent(), !paginator_4_1.done)) return [3 /*break*/, 5];
                    _5 = paginator_4_1.value;
                    if (++i > 1) {
                        return [3 /*break*/, 5];
                    }
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_5_1 = _b.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(paginator_4_1 && !paginator_4_1.done && (_a = paginator_4.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(paginator_4)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_5) throw e_5.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(paginator.lastEvaluatedKey).toEqual({ fizz: { S: 'crackle' } });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=ScanPaginator.spec.js.map