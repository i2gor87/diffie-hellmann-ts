"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var GenerateRandomPrimeNumber_1 = require("./GenerateRandomPrimeNumber");
var GeneratePublicGKey_1 = require("./GeneratePublicGKey");
var rp = require("request-promise");
var _dev_1 = require("../_config/_dev");
var ComputeMod_1 = require("./ComputeMod");
var computeK = function () { return __awaiter(_this, void 0, void 0, function () {
    var alice_p, alice_g, alice_A, alice_x, get_bob_y, make_K;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, GenerateRandomPrimeNumber_1.generateRandomPrimeNumber(5)];
            case 1:
                alice_p = _a.sent();
                return [4 /*yield*/, GeneratePublicGKey_1.generateG(alice_p)];
            case 2:
                alice_g = _a.sent();
                return [4 /*yield*/, GenerateRandomPrimeNumber_1.generateRandomPrimeNumber(5)];
            case 3:
                alice_A = _a.sent();
                return [4 /*yield*/, ComputeMod_1.computeMod(alice_g, alice_A, alice_p)];
            case 4:
                alice_x = _a.sent();
                console.log('p, g, a, x', alice_p, alice_g, alice_A, alice_x);
                get_bob_y = function () {
                    return rp({
                        uri: _dev_1.bobURL + "/get_key",
                        method: "POST",
                        json: true,
                        body: {
                            alice_p: alice_p,
                            alice_g: alice_g,
                            alice_x: alice_x
                        }
                    }).then(function (data) {
                        return data;
                    });
                };
                return [4 /*yield*/, get_bob_y().then(function (bob_y) {
                        console.log("returned body", bob_y.data.bob_y);
                        var K = ComputeMod_1.computeMod(bob_y.data.bob_y, alice_A, alice_p);
                        console.log("K", K);
                        return K;
                    })];
            case 5:
                make_K = _a.sent();
                console.log("K okay", make_K);
                return [2 /*return*/, make_K];
        }
    });
}); };
computeK();
