"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BatchGet_1 = require("./BatchGet");
describe('BatchGet', function () {
    var e_1, _a;
    var promiseFunc = jest.fn(function () { return Promise.resolve({
        UnprocessedKeys: {}
    }); });
    var mockDynamoDbClient = {
        config: {},
        batchGetItem: jest.fn(function () { return ({ promise: promiseFunc }); }),
    };
    beforeEach(function () {
        promiseFunc.mockClear();
        mockDynamoDbClient.batchGetItem.mockClear();
    });
    it('should return itself when its Symbol.asyncIterator method is called', function () {
        var batchGet = new BatchGet_1.BatchGet({}, []);
        expect(batchGet[Symbol.asyncIterator]()).toBe(batchGet);
    });
    it('should allow setting an overall read consistency', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var batchGet, batchGet_1, batchGet_1_1, _1, e_2_1;
        var e_2, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batchGet = new BatchGet_1.BatchGet(mockDynamoDbClient, [['foo', { fizz: { N: '0' } }]], { ConsistentRead: true });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    batchGet_1 = tslib_1.__asyncValues(batchGet);
                    _b.label = 2;
                case 2: return [4 /*yield*/, batchGet_1.next()];
                case 3:
                    if (!(batchGet_1_1 = _b.sent(), !batchGet_1_1.done)) return [3 /*break*/, 5];
                    _1 = batchGet_1_1.value;
                    console.log(_1 === undefined);
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(batchGet_1_1 && !batchGet_1_1.done && (_a = batchGet_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(batchGet_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(mockDynamoDbClient.batchGetItem.mock.calls).toEqual([
                        [
                            {
                                RequestItems: {
                                    foo: {
                                        Keys: [
                                            { fizz: { N: '0' } }
                                        ],
                                        ConsistentRead: true
                                    }
                                }
                            }
                        ]
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should allow setting per-table read consistency', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var batchGet, batchGet_2, batchGet_2_1, _2, e_3_1;
        var e_3, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batchGet = new BatchGet_1.BatchGet(mockDynamoDbClient, [
                        ['foo', { fizz: { N: '0' } }],
                        ['bar', { quux: { N: '1' } }],
                    ], {
                        ConsistentRead: true,
                        PerTableOptions: {
                            bar: { ConsistentRead: false }
                        }
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    batchGet_2 = tslib_1.__asyncValues(batchGet);
                    _b.label = 2;
                case 2: return [4 /*yield*/, batchGet_2.next()];
                case 3:
                    if (!(batchGet_2_1 = _b.sent(), !batchGet_2_1.done)) return [3 /*break*/, 5];
                    _2 = batchGet_2_1.value;
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(batchGet_2_1 && !batchGet_2_1.done && (_a = batchGet_2.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(batchGet_2)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(mockDynamoDbClient.batchGetItem.mock.calls).toEqual([
                        [
                            {
                                RequestItems: {
                                    foo: {
                                        Keys: [
                                            { fizz: { N: '0' } }
                                        ],
                                        ConsistentRead: true
                                    },
                                    bar: {
                                        Keys: [
                                            { quux: { N: '1' } }
                                        ],
                                        ConsistentRead: false
                                    }
                                }
                            }
                        ]
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should allow specifying per-table projection expressions', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var batchGet, batchGet_3, batchGet_3_1, _3, e_4_1;
        var e_4, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batchGet = new BatchGet_1.BatchGet(mockDynamoDbClient, [
                        ['foo', { fizz: { N: '0' } }],
                        ['bar', { quux: { N: '1' } }],
                    ], {
                        PerTableOptions: {
                            bar: {
                                ProjectionExpression: 'snap[1].crackle.pop[2]'
                            }
                        }
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    batchGet_3 = tslib_1.__asyncValues(batchGet);
                    _b.label = 2;
                case 2: return [4 /*yield*/, batchGet_3.next()];
                case 3:
                    if (!(batchGet_3_1 = _b.sent(), !batchGet_3_1.done)) return [3 /*break*/, 5];
                    _3 = batchGet_3_1.value;
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(batchGet_3_1 && !batchGet_3_1.done && (_a = batchGet_3.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(batchGet_3)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    expect(mockDynamoDbClient.batchGetItem.mock.calls).toEqual([
                        [
                            {
                                RequestItems: {
                                    foo: {
                                        Keys: [
                                            { fizz: { N: '0' } }
                                        ]
                                    },
                                    bar: {
                                        Keys: [
                                            { quux: { N: '1' } }
                                        ],
                                        ProjectionExpression: 'snap[1].crackle.pop[2]'
                                    }
                                }
                            }
                        ]
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    var _loop_1 = function (asyncInput) {
        it("should should partition get batches into requests with " + BatchGet_1.MAX_READ_BATCH_SIZE + " or fewer items", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var gets, expected, responses, i, table, fizz, buzz, _loop_2, responses_1, responses_1_1, response, input, seen, _a, _b, _c, table, item, id, e_5_1, calls;
            var e_6, _d;
            var e_5, _e;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        gets = [];
                        expected = [
                            [
                                {
                                    RequestItems: {
                                        snap: { Keys: [] },
                                        crackle: { Keys: [] },
                                        pop: { Keys: [] },
                                    }
                                }
                            ],
                            [
                                {
                                    RequestItems: {
                                        snap: { Keys: [] },
                                        crackle: { Keys: [] },
                                        pop: { Keys: [] },
                                    }
                                }
                            ],
                            [
                                {
                                    RequestItems: {
                                        snap: { Keys: [] },
                                        crackle: { Keys: [] },
                                        pop: { Keys: [] },
                                    }
                                }
                            ],
                            [
                                {
                                    RequestItems: {
                                        snap: { Keys: [] },
                                        crackle: { Keys: [] },
                                        pop: { Keys: [] },
                                    }
                                }
                            ],
                        ];
                        responses = [
                            {
                                Responses: {
                                    snap: [],
                                    crackle: [],
                                    pop: [],
                                }
                            },
                            {
                                Responses: {
                                    snap: [],
                                    crackle: [],
                                    pop: [],
                                }
                            },
                            {
                                Responses: {
                                    snap: [],
                                    crackle: [],
                                    pop: [],
                                }
                            },
                            {
                                Responses: {
                                    snap: [],
                                    crackle: [],
                                    pop: [],
                                }
                            },
                        ];
                        for (i = 0; i < 325; i++) {
                            table = i % 3 === 0
                                ? 'snap'
                                : i % 3 === 1 ? 'crackle' : 'pop';
                            fizz = { N: String(i) };
                            buzz = { S: 'Static string' };
                            gets.push([table, { fizz: { N: String(i) } }]);
                            responses[Math.floor(i / BatchGet_1.MAX_READ_BATCH_SIZE)]
                                .Responses[table]
                                .push({ fizz: fizz, buzz: buzz });
                            expected[Math.floor(i / BatchGet_1.MAX_READ_BATCH_SIZE)][0]
                                .RequestItems[table].Keys
                                .push({ fizz: fizz });
                        }
                        _loop_2 = function (response) {
                            promiseFunc.mockImplementationOnce(function () { return Promise.resolve(response); });
                        };
                        try {
                            for (responses_1 = tslib_1.__values(responses), responses_1_1 = responses_1.next(); !responses_1_1.done; responses_1_1 = responses_1.next()) {
                                response = responses_1_1.value;
                                _loop_2(response);
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (responses_1_1 && !responses_1_1.done && (_d = responses_1.return)) _d.call(responses_1);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        input = asyncInput
                            ? function () {
                                return tslib_1.__asyncGenerator(this, arguments, function () {
                                    var gets_1, gets_1_1, item, e_7_1;
                                    var e_7, _a;
                                    return tslib_1.__generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 7, 8, 9]);
                                                gets_1 = tslib_1.__values(gets), gets_1_1 = gets_1.next();
                                                _b.label = 1;
                                            case 1:
                                                if (!!gets_1_1.done) return [3 /*break*/, 6];
                                                item = gets_1_1.value;
                                                return [4 /*yield*/, tslib_1.__await(new Promise(function (resolve) { return setTimeout(resolve, Math.round(Math.random())); }))];
                                            case 2:
                                                _b.sent();
                                                return [4 /*yield*/, tslib_1.__await(item)];
                                            case 3: return [4 /*yield*/, _b.sent()];
                                            case 4:
                                                _b.sent();
                                                _b.label = 5;
                                            case 5:
                                                gets_1_1 = gets_1.next();
                                                return [3 /*break*/, 1];
                                            case 6: return [3 /*break*/, 9];
                                            case 7:
                                                e_7_1 = _b.sent();
                                                e_7 = { error: e_7_1 };
                                                return [3 /*break*/, 9];
                                            case 8:
                                                try {
                                                    if (gets_1_1 && !gets_1_1.done && (_a = gets_1.return)) _a.call(gets_1);
                                                }
                                                finally { if (e_7) throw e_7.error; }
                                                return [7 /*endfinally*/];
                                            case 9: return [2 /*return*/];
                                        }
                                    });
                                });
                            }()
                            : gets;
                        seen = new Set();
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 6, 7, 12]);
                        _a = tslib_1.__asyncValues(new BatchGet_1.BatchGet(mockDynamoDbClient, input));
                        _f.label = 2;
                    case 2: return [4 /*yield*/, _a.next()];
                    case 3:
                        if (!(_b = _f.sent(), !_b.done)) return [3 /*break*/, 5];
                        _c = tslib_1.__read(_b.value, 2), table = _c[0], item = _c[1];
                        id = parseInt(item.fizz.N);
                        expect(seen.has(id)).toBe(false);
                        seen.add(id);
                        if (id % 3 === 0) {
                            expect(table).toBe('snap');
                        }
                        else if (id % 3 === 1) {
                            expect(table).toBe('crackle');
                        }
                        else {
                            expect(table).toBe('pop');
                        }
                        expect(item.buzz).toEqual({ S: 'Static string' });
                        _f.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_5_1 = _f.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _f.trys.push([7, , 10, 11]);
                        if (!(_b && !_b.done && (_e = _a.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _e.call(_a)];
                    case 8:
                        _f.sent();
                        _f.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        expect(seen.size).toBe(gets.length);
                        calls = mockDynamoDbClient.batchGetItem.mock.calls;
                        expect(calls.length)
                            .toBe(Math.ceil(gets.length / BatchGet_1.MAX_READ_BATCH_SIZE));
                        expect(calls).toEqual(expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should should retry unprocessed items', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var failures, gets, i, table, toBeFailed, input, idsReturned, _a, _b, _c, table, item, id, e_8_1, calls, callCount, i;
            var e_8, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        failures = new Set(['24', '66', '99', '103', '142', '178', '204', '260', '288']);
                        gets = [];
                        for (i = 0; i < 325; i++) {
                            table = i % 3 === 0
                                ? 'snap'
                                : i % 3 === 1 ? 'crackle' : 'pop';
                            gets.push([table, { fizz: { N: String(i) } }]);
                        }
                        toBeFailed = new Set(failures);
                        promiseFunc.mockImplementation(function () {
                            var e_9, _a, e_10, _b;
                            var buzz = { S: 'Static string' };
                            var response = {};
                            var RequestItems = mockDynamoDbClient.batchGetItem.mock.calls.slice(-1)[0][0].RequestItems;
                            try {
                                for (var _c = tslib_1.__values(Object.keys(RequestItems)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var tableName = _d.value;
                                    try {
                                        for (var _e = (e_10 = void 0, tslib_1.__values(RequestItems[tableName].Keys)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                            var item = _f.value;
                                            if (toBeFailed.has(item.fizz.N)) {
                                                if (!response.UnprocessedKeys) {
                                                    response.UnprocessedKeys = {};
                                                }
                                                if (!(tableName in response.UnprocessedKeys)) {
                                                    response.UnprocessedKeys[tableName] = { Keys: [] };
                                                }
                                                response.UnprocessedKeys[tableName].Keys.push(item);
                                                toBeFailed.delete(item.fizz.N);
                                            }
                                            else {
                                                if (!response.Responses) {
                                                    response.Responses = {};
                                                }
                                                if (!(tableName in response.Responses)) {
                                                    response.Responses[tableName] = [];
                                                }
                                                response.Responses[tableName].push(tslib_1.__assign(tslib_1.__assign({}, item), { buzz: buzz }));
                                            }
                                        }
                                    }
                                    catch (e_10_1) { e_10 = { error: e_10_1 }; }
                                    finally {
                                        try {
                                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                        }
                                        finally { if (e_10) throw e_10.error; }
                                    }
                                }
                            }
                            catch (e_9_1) { e_9 = { error: e_9_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_9) throw e_9.error; }
                            }
                            return Promise.resolve(response);
                        });
                        input = asyncInput
                            ? function () {
                                return tslib_1.__asyncGenerator(this, arguments, function () {
                                    var gets_2, gets_2_1, item, e_11_1;
                                    var e_11, _a;
                                    return tslib_1.__generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 7, 8, 9]);
                                                gets_2 = tslib_1.__values(gets), gets_2_1 = gets_2.next();
                                                _b.label = 1;
                                            case 1:
                                                if (!!gets_2_1.done) return [3 /*break*/, 6];
                                                item = gets_2_1.value;
                                                return [4 /*yield*/, tslib_1.__await(new Promise(function (resolve) { return setTimeout(resolve, Math.round(Math.random())); }))];
                                            case 2:
                                                _b.sent();
                                                return [4 /*yield*/, tslib_1.__await(item)];
                                            case 3: return [4 /*yield*/, _b.sent()];
                                            case 4:
                                                _b.sent();
                                                _b.label = 5;
                                            case 5:
                                                gets_2_1 = gets_2.next();
                                                return [3 /*break*/, 1];
                                            case 6: return [3 /*break*/, 9];
                                            case 7:
                                                e_11_1 = _b.sent();
                                                e_11 = { error: e_11_1 };
                                                return [3 /*break*/, 9];
                                            case 8:
                                                try {
                                                    if (gets_2_1 && !gets_2_1.done && (_a = gets_2.return)) _a.call(gets_2);
                                                }
                                                finally { if (e_11) throw e_11.error; }
                                                return [7 /*endfinally*/];
                                            case 9: return [2 /*return*/];
                                        }
                                    });
                                });
                            }()
                            : gets;
                        idsReturned = new Set();
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 12]);
                        _a = tslib_1.__asyncValues(new BatchGet_1.BatchGet(mockDynamoDbClient, input));
                        _e.label = 2;
                    case 2: return [4 /*yield*/, _a.next()];
                    case 3:
                        if (!(_b = _e.sent(), !_b.done)) return [3 /*break*/, 5];
                        _c = tslib_1.__read(_b.value, 2), table = _c[0], item = _c[1];
                        id = parseInt(item.fizz.N);
                        expect(idsReturned.has(id)).toBe(false);
                        idsReturned.add(id);
                        if (id % 3 === 0) {
                            expect(table).toBe('snap');
                        }
                        else if (id % 3 === 1) {
                            expect(table).toBe('crackle');
                        }
                        else {
                            expect(table).toBe('pop');
                        }
                        expect(item.buzz).toEqual({ S: 'Static string' });
                        _e.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_8_1 = _e.sent();
                        e_8 = { error: e_8_1 };
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
                        if (e_8) throw e_8.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        expect(idsReturned.size).toBe(gets.length);
                        expect(toBeFailed.size).toBe(0);
                        calls = mockDynamoDbClient.batchGetItem.mock.calls;
                        expect(calls.length).toBe(Math.ceil(gets.length / BatchGet_1.MAX_READ_BATCH_SIZE));
                        callCount = calls.reduce(function (keyUseCount, _a) {
                            var e_12, _b, e_13, _c;
                            var _d = tslib_1.__read(_a, 1), RequestItems = _d[0].RequestItems;
                            var keys = [];
                            try {
                                for (var _e = tslib_1.__values(Object.keys(RequestItems)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var table = _f.value;
                                    keys.push.apply(keys, tslib_1.__spread(RequestItems[table].Keys));
                                }
                            }
                            catch (e_12_1) { e_12 = { error: e_12_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                }
                                finally { if (e_12) throw e_12.error; }
                            }
                            try {
                                for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                                    var key = keys_1_1.value.fizz.N;
                                    if (key) {
                                        if (key in keyUseCount) {
                                            keyUseCount[key]++;
                                        }
                                        else {
                                            keyUseCount[key] = 1;
                                        }
                                    }
                                }
                            }
                            catch (e_13_1) { e_13 = { error: e_13_1 }; }
                            finally {
                                try {
                                    if (keys_1_1 && !keys_1_1.done && (_c = keys_1.return)) _c.call(keys_1);
                                }
                                finally { if (e_13) throw e_13.error; }
                            }
                            return keyUseCount;
                        }, {});
                        for (i = 0; i < gets.length; i++) {
                            expect(callCount[i]).toBe(failures.has(String(i)) ? 2 : 1);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    try {
        for (var _b = tslib_1.__values([true, false]), _c = _b.next(); !_c.done; _c = _b.next()) {
            var asyncInput = _c.value;
            _loop_1(asyncInput);
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
//# sourceMappingURL=BatchGet.spec.js.map