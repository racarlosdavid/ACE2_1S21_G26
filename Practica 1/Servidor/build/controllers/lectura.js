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
var apiController_lectura = /** @class */ (function () {
    function apiController_lectura() {
    }
    apiController_lectura.prototype.agregar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("insert into lectura (id_user,tipo,fecha,dato)\n            values (" + req.body.id_user + ", \"" + req.body.tipo + "\",\"" + req.body.fecha + "\", " + req.body.dato + ")\n            ")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ status: "c:", mensaje: "se ingreso la lectura" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.json({ status: ":c", mensaje: "problemas para ingresar la lectura" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    apiController_lectura.prototype.historial = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("select fecha,dato from lectura where id_user = " + req.body.iduser + " and tipo=\"" + req.body.tipo + "\" limit 10")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [2 /*return*/];
                }
            });
        });
    };
    apiController_lectura.prototype.historialMaximo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("select fecha,max(dato) from lectura where id_user = " + req.body.iduser + " and tipo=\"" + req.body.tipo + "\" ")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [2 /*return*/];
                }
            });
        });
    };
    apiController_lectura.prototype.historialMinimo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("select fecha,min(dato) from lectura where id_user = " + req.body.iduser + " and tipo=\"" + req.body.tipo + "\" ")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [2 /*return*/];
                }
            });
        });
    };
    apiController_lectura.prototype.historialPromedio = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("select avg(dato) from lectura where id_user = " + req.body.iduser + " and tipo=\"" + req.body.tipo + "\" ")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [2 /*return*/];
                }
            });
        });
    };
    apiController_lectura.prototype.tiempoReal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("select fecha,dato from lectura where id_user = " + req.body.iduser + " and tipo=\"" + req.body.tipo + "\" order by idlectura desc limit 1 ")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [2 /*return*/];
                }
            });
        });
    };
    return apiController_lectura;
}());
exports.apiController_lectura_ = new apiController_lectura();
