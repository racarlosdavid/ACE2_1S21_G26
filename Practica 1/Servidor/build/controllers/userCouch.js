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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
var apiController_userCouch = /** @class */ (function () {
    function apiController_userCouch() {
    }
    apiController_userCouch.prototype.asignar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("\n            update usuario set \n            iduser_couch=\"" + req.body.iduser_couch + "\" \n            where email=\"" + req.body.emailAtleta + "\"")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ status: "c:", mensaje: "se logro asignar couch al usuario" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.json({ status: ":c", mensaje: "no se pudo asignar al couch" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    apiController_userCouch.prototype.quitarCouch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("update usuario set iduser_couch= null where email =\"" + req.body.emailAtleta + "\"")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ status: "c:", mensaje: "se quito couch a este " });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    apiController_userCouch.prototype.traerListaAtleta = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("select * from usuario where iduser_couch = " + req.body.iduser_couch)];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    apiController_userCouch.prototype.preguntar_si_es_couch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var comando, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, database_1.default.query("select couch from usuario where email= \"" + req.body.email + "\" ")];
                    case 1:
                        comando = _a.sent();
                        res.json({ respuesta: comando });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return apiController_userCouch;
}());
exports.apiController_user_couch_ = new apiController_userCouch();
