"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = require(".");
describe('QueryIterator', function () {
    var promiseFunc = jest.fn();
    var mockDynamoDbClient = {
        config: {},
        query: jest.fn()
    };
    beforeEach(function () {
        promiseFunc.mockClear();
        promiseFunc.mockImplementation(function () { return Promise.resolve({ Items: [] }); });
        mockDynamoDbClient.query.mockClear();
        mockDynamoDbClient.query.mockImplementation(function () {
            return { promise: promiseFunc };
        });
    });
    it('should paginate over results and return a promise for each item', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result, _a, _b, item, e_1_1;
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
                    _a = tslib_1.__asyncValues(new _1.QueryIterator(mockDynamoDbClient, { TableName: 'foo' }));
                    _d.label = 2;
                case 2: return [4 /*yield*/, _a.next()];
                case 3:
                    if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 5];
                    item = _b.value;
                    result.push(item);
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
    it('should provide access to the underlying paginator', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var iterator;
        return tslib_1.__generator(this, function (_a) {
            iterator = new _1.QueryIterator(mockDynamoDbClient, { TableName: 'foo' });
            expect(iterator.pages()).toBeInstanceOf(_1.QueryPaginator);
            return [2 /*return*/];
        });
    }); });
    it('should not allow iteration once the paginator has been detached', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var iterator;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    iterator = new _1.QueryIterator(mockDynamoDbClient, { TableName: 'foo' });
                    // detach the paginator
                    iterator.pages();
                    return [4 /*yield*/, expect(iterator.next()).rejects.toMatchObject(new Error('The underlying paginator has been detached from this iterator.'))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should provide access to paginator metadata', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var iterator, expectedCount, expectedScanCounts, iterator_1, iterator_1_1, _2, e_2_1;
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
                        Count: 1,
                        ScannedCount: 1,
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
                        Count: 1,
                        ScannedCount: 2,
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
                        Count: 1,
                        ScannedCount: 3,
                        ConsumedCapacity: {
                            TableName: 'foo',
                            CapacityUnits: 2
                        }
                    }); });
                    iterator = new _1.QueryIterator(mockDynamoDbClient, { TableName: 'foo' });
                    expectedCount = 0;
                    expectedScanCounts = [1, 3, 6];
                    expect(iterator.count).toBe(expectedCount);
                    expect(iterator.scannedCount).toBe(expectedCount);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    iterator_1 = tslib_1.__asyncValues(iterator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, iterator_1.next()];
                case 3:
                    if (!(iterator_1_1 = _b.sent(), !iterator_1_1.done)) return [3 /*break*/, 5];
                    _2 = iterator_1_1.value;
                    expect(iterator.count).toBe(++expectedCount);
                    expect(iterator.scannedCount).toBe(expectedScanCounts.shift());
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(iterator_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(iterator.count).toBe(3);
                    expect(iterator.scannedCount).toBe(6);
                    expect(iterator.consumedCapacity).toEqual({
                        TableName: 'foo',
                        CapacityUnits: 6
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not allow iteration once return has been called', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var iterator, iterator_2, iterator_2_1, _3, e_3_1;
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
                    }); });
                    iterator = new _1.QueryIterator(mockDynamoDbClient, { TableName: 'foo' });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    iterator_2 = tslib_1.__asyncValues(iterator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, iterator_2.next()];
                case 3:
                    if (!(iterator_2_1 = _b.sent(), !iterator_2_1.done)) return [3 /*break*/, 5];
                    _3 = iterator_2_1.value;
                    return [3 /*break*/, 5];
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(iterator_2_1 && !iterator_2_1.done && (_a = iterator_2.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(iterator_2)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [4 /*yield*/, expect(iterator.next()).rejects.toMatchObject(new Error('Iteration has been manually interrupted and may not be resumed'))];
                case 13:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=QueryIterator.spec.js.map