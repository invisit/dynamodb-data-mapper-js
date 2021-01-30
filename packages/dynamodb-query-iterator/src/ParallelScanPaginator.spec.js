"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = require(".");
describe('ParallelScanPaginator', function () {
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
    it('should execute multiple requests in parallel when performing a scan with multiple segments', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var segments, keys, index, _loop_1, keys_1, keys_1_1, key, result, _a, _b, res, e_1_1;
        var e_2, _c;
        var e_1, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    segments = 2;
                    keys = ['snap', 'crackle', 'pop', 'foo', 'bar', 'baz'];
                    index = 0;
                    // Ensure that the first promise won't resolve immediately. This
                    // would block progress on a sequential scan but should pose no
                    // problem for a parallel one.
                    promiseFunc.mockImplementationOnce(function () { return new Promise(function (resolve) {
                        setTimeout(resolve.bind(null, {
                            Items: [
                                {
                                    fizz: { S: 'quux' },
                                    bar: { NS: ['5', '12', '13'] },
                                    baz: { L: [{ BOOL: true }, { N: '101' }] },
                                },
                            ],
                        }), 50);
                    }); });
                    _loop_1 = function (key) {
                        promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                            Items: [
                                {
                                    fizz: { S: key },
                                    bar: { NS: [
                                            (++index).toString(10),
                                            (++index).toString(10),
                                        ] },
                                    baz: { L: [
                                            { BOOL: index % 2 === 0 },
                                            { N: (++index).toString(10) }
                                        ] },
                                },
                            ],
                            LastEvaluatedKey: { fizz: { S: key } },
                        }); });
                    };
                    try {
                        // Enqueue a number of responses that will resolve synchronously
                        for (keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                            key = keys_1_1.value;
                            _loop_1(key);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (keys_1_1 && !keys_1_1.done && (_c = keys_1.return)) _c.call(keys_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    // Enqueue a final page for this segment
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({ Items: [] }); });
                    result = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _a = tslib_1.__asyncValues(new _1.ParallelScanPaginator(mockDynamoDbClient, {
                        TableName: 'foo',
                        TotalSegments: segments,
                    }));
                    _e.label = 2;
                case 2: return [4 /*yield*/, _a.next()];
                case 3:
                    if (!(_b = _e.sent(), !_b.done)) return [3 /*break*/, 5];
                    res = _b.value;
                    result.push(res);
                    _e.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(_b && !_b.done && (_d = _a.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _d.call(_a)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(result).toEqual([
                        {
                            Items: [
                                {
                                    fizz: { S: 'snap' },
                                    bar: { NS: ['1', '2'] },
                                    baz: { L: [{ BOOL: true }, { N: '3' }] }
                                },
                            ],
                            LastEvaluatedKey: { fizz: { S: 'snap' } }
                        },
                        {
                            Items: [
                                {
                                    fizz: { S: 'crackle' },
                                    bar: { NS: ['4', '5'] },
                                    baz: { L: [{ BOOL: false }, { N: '6' }] }
                                },
                            ],
                            LastEvaluatedKey: { fizz: { S: 'crackle' } }
                        },
                        {
                            Items: [
                                {
                                    fizz: { S: 'pop' },
                                    bar: { NS: ['7', '8'] },
                                    baz: { L: [{ BOOL: true }, { N: '9' }] }
                                },
                            ],
                            LastEvaluatedKey: { fizz: { S: 'pop' } }
                        },
                        {
                            Items: [
                                {
                                    fizz: { S: 'foo' },
                                    bar: { NS: ['10', '11'] },
                                    baz: { L: [{ BOOL: false }, { N: '12' }] }
                                },
                            ],
                            LastEvaluatedKey: { fizz: { S: 'foo' } }
                        },
                        {
                            Items: [
                                {
                                    fizz: { S: 'bar' },
                                    bar: { NS: ['13', '14'] },
                                    baz: { L: [{ BOOL: true }, { N: '15' }] }
                                },
                            ],
                            LastEvaluatedKey: { fizz: { S: 'bar' } }
                        },
                        {
                            Items: [
                                {
                                    fizz: { S: 'baz' },
                                    bar: { NS: ['16', '17'] },
                                    baz: { L: [{ BOOL: false }, { N: '18' }] }
                                },
                            ],
                            LastEvaluatedKey: { fizz: { S: 'baz' } }
                        },
                        {
                            Items: []
                        },
                        {
                            Items: [
                                {
                                    fizz: { S: 'quux' },
                                    bar: { NS: ['5', '12', '13'] },
                                    baz: { L: [{ BOOL: true }, { N: '101' }] }
                                },
                            ]
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should merge counts', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var paginator, paginator_1, paginator_1_1, _2, e_3_1;
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
                    paginator = new _1.ParallelScanPaginator(mockDynamoDbClient, {
                        TableName: 'foo',
                        TotalSegments: 2
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    paginator_1 = tslib_1.__asyncValues(paginator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, paginator_1.next()];
                case 3:
                    if (!(paginator_1_1 = _b.sent(), !paginator_1_1.done)) return [3 /*break*/, 5];
                    _2 = paginator_1_1.value;
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
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
        var paginator, paginator_2, paginator_2_1, _3, e_4_1;
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
                    paginator = new _1.ParallelScanPaginator(mockDynamoDbClient, {
                        TableName: 'foo',
                        TotalSegments: 2
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    paginator_2 = tslib_1.__asyncValues(paginator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, paginator_2.next()];
                case 3:
                    if (!(paginator_2_1 = _b.sent(), !paginator_2_1.done)) return [3 /*break*/, 5];
                    _3 = paginator_2_1.value;
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
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
    it('should report the scan state even after ceasing iteration', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var paginator, paginator_3, paginator_3_1, _4, e_5_1;
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
                    paginator = new _1.ParallelScanPaginator(mockDynamoDbClient, {
                        TableName: 'foo',
                        TotalSegments: 1
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    paginator_3 = tslib_1.__asyncValues(paginator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, paginator_3.next()];
                case 3:
                    if (!(paginator_3_1 = _b.sent(), !paginator_3_1.done)) return [3 /*break*/, 5];
                    _4 = paginator_3_1.value;
                    return [3 /*break*/, 5];
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_5_1 = _b.sent();
                    e_5 = { error: e_5_1 };
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
                    if (e_5) throw e_5.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(paginator.scanState).toEqual([{
                            initialized: true,
                            LastEvaluatedKey: { fizz: { S: 'snap' } }
                        }]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should resume pagination when given a state object', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var paginator, paginator_4, paginator_4_1, _5, e_6_1;
        var e_6, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'crackle' },
                                bar: { NS: ['5', '6', '7'] },
                                baz: { L: [{ BOOL: false }, { N: '8' }] }
                            },
                        ],
                    }); });
                    paginator = new _1.ParallelScanPaginator(mockDynamoDbClient, {
                        TableName: 'foo',
                        TotalSegments: 1
                    }, [
                        {
                            initialized: true,
                            LastEvaluatedKey: { fizz: { S: 'snap' } }
                        }
                    ]);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    paginator_4 = tslib_1.__asyncValues(paginator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, paginator_4.next()];
                case 3:
                    if (!(paginator_4_1 = _b.sent(), !paginator_4_1.done)) return [3 /*break*/, 5];
                    _5 = paginator_4_1.value;
                    return [3 /*break*/, 5];
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_6_1 = _b.sent();
                    e_6 = { error: e_6_1 };
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
                    if (e_6) throw e_6.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(mockDynamoDbClient.scan.mock.calls).toEqual([
                        [
                            {
                                TableName: 'foo',
                                ExclusiveStartKey: { fizz: { S: 'snap' } },
                                Segment: 0,
                                TotalSegments: 1,
                            }
                        ]
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should yield nothing when given a finished state object', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var paginator, paginator_5, paginator_5_1, _6, e_7_1;
        var e_7, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({
                        Items: [
                            {
                                fizz: { S: 'crackle' },
                                bar: { NS: ['5', '6', '7'] },
                                baz: { L: [{ BOOL: false }, { N: '8' }] }
                            },
                        ],
                    }); });
                    paginator = new _1.ParallelScanPaginator(mockDynamoDbClient, {
                        TableName: 'foo',
                        TotalSegments: 1
                    }, [{ initialized: true }]);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    paginator_5 = tslib_1.__asyncValues(paginator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, paginator_5.next()];
                case 3:
                    if (!(paginator_5_1 = _b.sent(), !paginator_5_1.done)) return [3 /*break*/, 5];
                    _6 = paginator_5_1.value;
                    throw new Error('This block should never have been entered');
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_7_1 = _b.sent();
                    e_7 = { error: e_7_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(paginator_5_1 && !paginator_5_1.done && (_a = paginator_5.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(paginator_5)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_7) throw e_7.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    }); });
    it('should throw when a parallel scan paginator is created with a scan state with the wrong number of segments', function () {
        expect(function () { return new _1.ParallelScanPaginator(mockDynamoDbClient, {
            TableName: 'foo',
            TotalSegments: 1
        }, [
            {
                initialized: true,
                LastEvaluatedKey: { fizz: { S: 'snap' } }
            },
            {
                initialized: true,
                LastEvaluatedKey: { fizz: { S: 'crackle' } }
            }
        ]); }).toThrow();
    });
});
//# sourceMappingURL=ParallelScanPaginator.spec.js.map