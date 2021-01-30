"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BatchWrite_1 = require("./BatchWrite");
describe('BatchWrite', function () {
    var e_1, _a;
    var promiseFunc = jest.fn(function () { return Promise.resolve({
        UnprocessedItems: {}
    }); });
    var mockDynamoDbClient = {
        config: {},
        batchWriteItem: jest.fn(function () { return ({ promise: promiseFunc }); }),
    };
    beforeEach(function () {
        promiseFunc.mockClear();
        mockDynamoDbClient.batchWriteItem.mockClear();
    });
    it('should return itself when its Symbol.asyncIterator method is called', function () {
        var batchWrite = new BatchWrite_1.BatchWrite({}, []);
        expect(batchWrite[Symbol.asyncIterator]()).toBe(batchWrite);
    });
    var _loop_1 = function (asyncInput) {
        it("should should partition write batches into requests with " + BatchWrite_1.MAX_WRITE_BATCH_SIZE + " or fewer items", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var writes, expected, i, table, fizz, req, input, _a, _b, _c, tableName, req, id, e_2_1, calls;
            var e_2, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        writes = [];
                        expected = [
                            [
                                {
                                    RequestItems: {
                                        snap: [],
                                        crackle: [],
                                        pop: [],
                                    }
                                }
                            ],
                            [
                                {
                                    RequestItems: {
                                        snap: [],
                                        crackle: [],
                                        pop: [],
                                    }
                                }
                            ],
                            [
                                {
                                    RequestItems: {
                                        snap: [],
                                        crackle: [],
                                        pop: [],
                                    }
                                }
                            ],
                            [
                                {
                                    RequestItems: {
                                        snap: [],
                                        crackle: [],
                                        pop: [],
                                    }
                                }
                            ],
                        ];
                        for (i = 0; i < 80; i++) {
                            table = i % 3 === 0
                                ? 'snap'
                                : i % 3 === 1 ? 'crackle' : 'pop';
                            fizz = { N: String(i) };
                            req = i % 2 === 0
                                ? { DeleteRequest: { Key: { fizz: fizz } } }
                                : { PutRequest: { Item: { fizz: fizz } } };
                            writes.push([table, req]);
                            expected[Math.floor(i / BatchWrite_1.MAX_WRITE_BATCH_SIZE)][0]
                                .RequestItems[table]
                                .push(req);
                        }
                        input = asyncInput
                            ? function () {
                                return tslib_1.__asyncGenerator(this, arguments, function () {
                                    var writes_1, writes_1_1, item, e_3_1;
                                    var e_3, _a;
                                    return tslib_1.__generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 7, 8, 9]);
                                                writes_1 = tslib_1.__values(writes), writes_1_1 = writes_1.next();
                                                _b.label = 1;
                                            case 1:
                                                if (!!writes_1_1.done) return [3 /*break*/, 6];
                                                item = writes_1_1.value;
                                                return [4 /*yield*/, tslib_1.__await(new Promise(function (resolve) { return setTimeout(resolve, Math.round(Math.random())); }))];
                                            case 2:
                                                _b.sent();
                                                return [4 /*yield*/, tslib_1.__await(item)];
                                            case 3: return [4 /*yield*/, _b.sent()];
                                            case 4:
                                                _b.sent();
                                                _b.label = 5;
                                            case 5:
                                                writes_1_1 = writes_1.next();
                                                return [3 /*break*/, 1];
                                            case 6: return [3 /*break*/, 9];
                                            case 7:
                                                e_3_1 = _b.sent();
                                                e_3 = { error: e_3_1 };
                                                return [3 /*break*/, 9];
                                            case 8:
                                                try {
                                                    if (writes_1_1 && !writes_1_1.done && (_a = writes_1.return)) _a.call(writes_1);
                                                }
                                                finally { if (e_3) throw e_3.error; }
                                                return [7 /*endfinally*/];
                                            case 9: return [2 /*return*/];
                                        }
                                    });
                                });
                            }()
                            : writes;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 12]);
                        _a = tslib_1.__asyncValues(new BatchWrite_1.BatchWrite(mockDynamoDbClient, input));
                        _e.label = 2;
                    case 2: return [4 /*yield*/, _a.next()];
                    case 3:
                        if (!(_b = _e.sent(), !_b.done)) return [3 /*break*/, 5];
                        _c = tslib_1.__read(_b.value, 2), tableName = _c[0], req = _c[1];
                        id = req.DeleteRequest
                            ? parseInt(req.DeleteRequest.Key.fizz.N)
                            : parseInt(req.PutRequest.Item.fizz.N);
                        if (id % 3 === 0) {
                            expect(tableName).toBe('snap');
                        }
                        else if (id % 3 === 1) {
                            expect(tableName).toBe('crackle');
                        }
                        else {
                            expect(tableName).toBe('pop');
                        }
                        _e.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
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
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        calls = mockDynamoDbClient.batchWriteItem.mock.calls;
                        expect(calls.length)
                            .toBe(Math.ceil(writes.length / BatchWrite_1.MAX_WRITE_BATCH_SIZE));
                        expect(calls).toEqual(expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should should retry unprocessed items', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var failures, writes, unprocessed, i, table, fizz, req, input, seen, _a, _b, _c, tableName, req, id, e_4_1, calls, callCount, i;
            var e_4, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        failures = new Set(['21', '24', '38', '43', '55', '60']);
                        writes = [];
                        unprocessed = new Map();
                        for (i = 0; i < 80; i++) {
                            table = i % 3 === 0
                                ? 'snap'
                                : i % 3 === 1 ? 'crackle' : 'pop';
                            fizz = { N: String(i) };
                            req = i % 2 === 0
                                ? { DeleteRequest: { Key: { fizz: fizz } } }
                                : { PutRequest: { Item: {
                                            fizz: fizz,
                                            buzz: { B: new ArrayBuffer(3) },
                                            pop: { B: Uint8Array.from([i]) },
                                            foo: { B: String.fromCharCode(i + 32) },
                                            quux: { S: 'string' }
                                        } } };
                            writes.push([table, req]);
                            if (failures.has(fizz.N)) {
                                unprocessed.set(fizz.N, req);
                            }
                        }
                        promiseFunc.mockImplementation(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var response, RequestItems, _a, _b, tableName, _c, _d, _e, DeleteRequest, PutRequest, item;
                            var e_5, _f, e_6, _g;
                            return tslib_1.__generator(this, function (_h) {
                                response = {};
                                RequestItems = mockDynamoDbClient.batchWriteItem.mock.calls.slice(-1)[0][0].RequestItems;
                                try {
                                    for (_a = tslib_1.__values(Object.keys(RequestItems)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                        tableName = _b.value;
                                        try {
                                            for (_c = (e_6 = void 0, tslib_1.__values(RequestItems[tableName])), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                _e = _d.value, DeleteRequest = _e.DeleteRequest, PutRequest = _e.PutRequest;
                                                item = DeleteRequest ? DeleteRequest.Key : PutRequest.Item;
                                                if (unprocessed.has(item.fizz.N)) {
                                                    if (!response.UnprocessedItems) {
                                                        response.UnprocessedItems = {};
                                                    }
                                                    if (!(tableName in response.UnprocessedItems)) {
                                                        response.UnprocessedItems[tableName] = [];
                                                    }
                                                    response.UnprocessedItems[tableName].push(unprocessed.get(item.fizz.N));
                                                    unprocessed.delete(item.fizz.N);
                                                }
                                            }
                                        }
                                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                        finally {
                                            try {
                                                if (_d && !_d.done && (_g = _c.return)) _g.call(_c);
                                            }
                                            finally { if (e_6) throw e_6.error; }
                                        }
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                                return [2 /*return*/, response];
                            });
                        }); });
                        input = asyncInput
                            ? function () {
                                return tslib_1.__asyncGenerator(this, arguments, function () {
                                    var writes_2, writes_2_1, item, e_7_1;
                                    var e_7, _a;
                                    return tslib_1.__generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 7, 8, 9]);
                                                writes_2 = tslib_1.__values(writes), writes_2_1 = writes_2.next();
                                                _b.label = 1;
                                            case 1:
                                                if (!!writes_2_1.done) return [3 /*break*/, 6];
                                                item = writes_2_1.value;
                                                return [4 /*yield*/, tslib_1.__await(new Promise(function (resolve) { return setTimeout(resolve, Math.round(Math.random())); }))];
                                            case 2:
                                                _b.sent();
                                                return [4 /*yield*/, tslib_1.__await(item)];
                                            case 3: return [4 /*yield*/, _b.sent()];
                                            case 4:
                                                _b.sent();
                                                _b.label = 5;
                                            case 5:
                                                writes_2_1 = writes_2.next();
                                                return [3 /*break*/, 1];
                                            case 6: return [3 /*break*/, 9];
                                            case 7:
                                                e_7_1 = _b.sent();
                                                e_7 = { error: e_7_1 };
                                                return [3 /*break*/, 9];
                                            case 8:
                                                try {
                                                    if (writes_2_1 && !writes_2_1.done && (_a = writes_2.return)) _a.call(writes_2);
                                                }
                                                finally { if (e_7) throw e_7.error; }
                                                return [7 /*endfinally*/];
                                            case 9: return [2 /*return*/];
                                        }
                                    });
                                });
                            }()
                            : writes;
                        seen = new Set();
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 12]);
                        _a = tslib_1.__asyncValues(new BatchWrite_1.BatchWrite(mockDynamoDbClient, input));
                        _e.label = 2;
                    case 2: return [4 /*yield*/, _a.next()];
                    case 3:
                        if (!(_b = _e.sent(), !_b.done)) return [3 /*break*/, 5];
                        _c = tslib_1.__read(_b.value, 2), tableName = _c[0], req = _c[1];
                        id = req.DeleteRequest
                            ? parseInt(req.DeleteRequest.Key.fizz.N)
                            : parseInt(req.PutRequest.Item.fizz.N);
                        expect(seen.has(id)).toBe(false);
                        seen.add(id);
                        if (id % 3 === 0) {
                            expect(tableName).toBe('snap');
                        }
                        else if (id % 3 === 1) {
                            expect(tableName).toBe('crackle');
                        }
                        else {
                            expect(tableName).toBe('pop');
                        }
                        _e.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_4_1 = _e.sent();
                        e_4 = { error: e_4_1 };
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
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        expect(seen.size).toBe(writes.length);
                        calls = mockDynamoDbClient.batchWriteItem.mock.calls;
                        expect(calls.length)
                            .toBe(Math.ceil(writes.length / BatchWrite_1.MAX_WRITE_BATCH_SIZE));
                        callCount = calls.reduce(function (keyUseCount, _a) {
                            var e_8, _b, e_9, _c;
                            var _d = tslib_1.__read(_a, 1), RequestItems = _d[0].RequestItems;
                            try {
                                for (var _e = tslib_1.__values(Object.keys(RequestItems)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var table = _f.value;
                                    try {
                                        for (var _g = (e_9 = void 0, tslib_1.__values(RequestItems[table])), _h = _g.next(); !_h.done; _h = _g.next()) {
                                            var _j = _h.value, PutRequest = _j.PutRequest, DeleteRequest = _j.DeleteRequest;
                                            var key = DeleteRequest
                                                ? DeleteRequest.Key.fizz.N
                                                : PutRequest.Item.fizz.N;
                                            if (key in keyUseCount) {
                                                keyUseCount[key]++;
                                            }
                                            else {
                                                keyUseCount[key] = 1;
                                            }
                                        }
                                    }
                                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                                    finally {
                                        try {
                                            if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                                        }
                                        finally { if (e_9) throw e_9.error; }
                                    }
                                }
                            }
                            catch (e_8_1) { e_8 = { error: e_8_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                }
                                finally { if (e_8) throw e_8.error; }
                            }
                            return keyUseCount;
                        }, {});
                        for (i = 0; i < writes.length; i++) {
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
//# sourceMappingURL=BatchWrite.spec.js.map