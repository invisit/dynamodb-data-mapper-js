"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _1 = require(".");
describe('ParallelScanIterator', function () {
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
                    _a = tslib_1.__asyncValues(new _1.ParallelScanIterator(mockDynamoDbClient, {
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
                            fizz: { S: 'snap' },
                            bar: { NS: ['1', '2'] },
                            baz: { L: [{ BOOL: true }, { N: '3' }] }
                        },
                        {
                            fizz: { S: 'crackle' },
                            bar: { NS: ['4', '5'] },
                            baz: { L: [{ BOOL: false }, { N: '6' }] }
                        },
                        {
                            fizz: { S: 'pop' },
                            bar: { NS: ['7', '8'] },
                            baz: { L: [{ BOOL: true }, { N: '9' }] }
                        },
                        {
                            fizz: { S: 'foo' },
                            bar: { NS: ['10', '11'] },
                            baz: { L: [{ BOOL: false }, { N: '12' }] }
                        },
                        {
                            fizz: { S: 'bar' },
                            bar: { NS: ['13', '14'] },
                            baz: { L: [{ BOOL: true }, { N: '15' }] }
                        },
                        {
                            fizz: { S: 'baz' },
                            bar: { NS: ['16', '17'] },
                            baz: { L: [{ BOOL: false }, { N: '18' }] }
                        },
                        {
                            fizz: { S: 'quux' },
                            bar: { NS: ['5', '12', '13'] },
                            baz: { L: [{ BOOL: true }, { N: '101' }] }
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should provide access to paginator metadata', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var iterator, iterator_1, iterator_1_1, _2, e_3_1;
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
                    promiseFunc.mockImplementationOnce(function () { return Promise.resolve({}); });
                    iterator = new _1.ParallelScanIterator(mockDynamoDbClient, { TableName: 'foo', TotalSegments: 2 });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    iterator_1 = tslib_1.__asyncValues(iterator);
                    _b.label = 2;
                case 2: return [4 /*yield*/, iterator_1.next()];
                case 3:
                    if (!(iterator_1_1 = _b.sent(), !iterator_1_1.done)) return [3 /*break*/, 5];
                    _2 = iterator_1_1.value;
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
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
                    if (e_3) throw e_3.error;
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
});
//# sourceMappingURL=ParallelScanIterator.spec.js.map