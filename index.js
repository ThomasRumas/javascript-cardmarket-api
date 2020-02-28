var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var request = require('request');
var URI = 'https://api.cardmarket.com/ws/v2.0/output.json';
var CardMarketApi = (function () {
    function CardMarketApi(APP_TOKEN, APP_SECRET, ACCESS_TOKEN, ACCESS_SECRET) {
        this.APP_TOKEN = APP_TOKEN;
        this.APP_SECRET = APP_SECRET;
        this.ACCESS_SECRET = ACCESS_SECRET;
        this.ACCESS_TOKEN = ACCESS_TOKEN;
        this.oauthParameters = {
            consumer_key: this.APP_TOKEN,
            consumer_secret: this.APP_SECRET,
            token: this.ACCESS_TOKEN,
            token_secret: this.ACCESS_SECRET
        };
    }
    CardMarketApi.prototype.doGetRequest = function (prmParameters) {
        var _this = this;
        if (prmParameters === void 0) { prmParameters = {}; }
        return new Promise(function (resolve, reject) {
            request.get(_this.oauthParameters.realm, { oauth: _this.oauthParameters, qs: prmParameters }, function (error, response) {
                if (!error && response.statusCode == 200) {
                    resolve(response.body);
                }
                else {
                    reject(error);
                }
            });
        });
    };
    CardMarketApi.prototype.getGames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.oauthParameters.realm = URI + "/games";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.doGetRequest()];
                    case 2:
                        results = _a.sent();
                        return [2, results];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 4: return [2];
                }
            });
        });
    };
    CardMarketApi.prototype.getExpansion = function (prmGame) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.oauthParameters.realm = URI + "/games/" + prmGame + "/expansions";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.doGetRequest()];
                    case 2:
                        results = _a.sent();
                        return [2, results];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 4: return [2];
                }
            });
        });
    };
    CardMarketApi.prototype.getExpansionsCardsList = function (prmExpansion) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.oauthParameters.realm = URI + "/expansions/" + prmExpansion + "/singles";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.doGetRequest()];
                    case 2:
                        results = _a.sent();
                        return [2, results];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error(error_3);
                    case 4: return [2];
                }
            });
        });
    };
    CardMarketApi.prototype.getProductDetails = function (prmProduct) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.oauthParameters.realm = URI + "/products/" + prmProduct;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.doGetRequest()];
                    case 2:
                        results = _a.sent();
                        return [2, results];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error(error_4);
                    case 4: return [2];
                }
            });
        });
    };
    CardMarketApi.prototype.searchProductOnMarket = function (prmProduct, prmQueryParameters) {
        if (prmQueryParameters === void 0) { prmQueryParameters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var defaultParameters, parameters, results, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultParameters = {
                            start: 0,
                            maxResults: 100,
                            idLanguage: 2,
                            minCondition: 'EX'
                        };
                        if (Object.keys(prmQueryParameters).length !== 0) {
                            parameters = prmQueryParameters;
                        }
                        else {
                            parameters = defaultParameters;
                        }
                        this.oauthParameters.realm = URI + "/articles/" + prmProduct;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.doGetRequest(parameters)];
                    case 2:
                        results = _a.sent();
                        return [2, results];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error(error_5);
                    case 4: return [2];
                }
            });
        });
    };
    return CardMarketApi;
}());
module.exports = CardMarketApi;
