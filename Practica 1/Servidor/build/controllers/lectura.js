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
            var accion2, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, database_1.default.query("insert into lectura \n            (id_user,fecha,t,o,r)\n            values (\n                " + req.body.id_user + ",\n                \"" + req.body.fecha + "\", \n                " + req.body.t + ",\n                " + req.body.o + ",\n                " + req.body.r + "\n                )\n            ")];
                    case 1:
                        accion2 = _a.sent();
                        res.json({ status: "c:", mensaje: "se ingreso la lectura" });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.json({ status: ":c", mensaje: "problemas para ingresar la lectura", otromensaje: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    apiController_lectura.prototype.historial = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion2, accion2, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.tipo == "T")) return [3 /*break*/, 2];
                        return [4 /*yield*/, database_1.default.query("select fecha,t as dato from lectura where id_user = " + req.body.iduser + " order by idlectura desc limit 10")];
                    case 1:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(req.body.tipo == "O")) return [3 /*break*/, 4];
                        return [4 /*yield*/, database_1.default.query("select fecha,o as dato from lectura where id_user = " + req.body.iduser + " order by idlectura desc limit 10")];
                    case 3:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(req.body.tipo == "R")) return [3 /*break*/, 6];
                        return [4 /*yield*/, database_1.default.query("select fecha,r as dato from lectura where id_user = " + req.body.iduser + " order by idlectura desc limit 10")];
                    case 5:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    apiController_lectura.prototype.historialMaximo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion2, accion2, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.tipo == "T")) return [3 /*break*/, 2];
                        return [4 /*yield*/, database_1.default.query("select fecha,max(t) as 'max(dato)' from lectura where id_user = " + req.body.iduser + " ")];
                    case 1:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(req.body.tipo == "O")) return [3 /*break*/, 4];
                        return [4 /*yield*/, database_1.default.query("select fecha,max(o) as 'max(dato)' from lectura where id_user = " + req.body.iduser + " ")];
                    case 3:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(req.body.tipo == "R")) return [3 /*break*/, 6];
                        return [4 /*yield*/, database_1.default.query("select fecha,max(r) as 'max(dato)' from lectura where id_user = " + req.body.iduser + " ")];
                    case 5:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    apiController_lectura.prototype.historialMinimo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion2, accion2, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.tipo == "T")) return [3 /*break*/, 2];
                        return [4 /*yield*/, database_1.default.query("select fecha,min(t) as 'min(dato)' from lectura where id_user = " + req.body.iduser + " ")];
                    case 1:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(req.body.tipo == "O")) return [3 /*break*/, 4];
                        return [4 /*yield*/, database_1.default.query("select fecha,min(o) as 'min(dato)' from lectura where id_user = " + req.body.iduser + " ")];
                    case 3:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(req.body.tipo == "R")) return [3 /*break*/, 6];
                        return [4 /*yield*/, database_1.default.query("select fecha,min(r) as 'min(dato)' from lectura where id_user = " + req.body.iduser + " ")];
                    case 5:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    apiController_lectura.prototype.historialPromedio = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion2, accion2, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.tipo == "T")) return [3 /*break*/, 2];
                        return [4 /*yield*/, database_1.default.query("select avg(t) as 'avg(dato)' from lectura where id_user = " + req.body.iduser + " ")];
                    case 1:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(req.body.tipo == "O")) return [3 /*break*/, 4];
                        return [4 /*yield*/, database_1.default.query("select avg(o) as 'avg(dato)' from lectura where id_user = " + req.body.iduser + " ")];
                    case 3:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(req.body.tipo == "R")) return [3 /*break*/, 6];
                        return [4 /*yield*/, database_1.default.query("select avg(r) as 'avg(dato)' from lectura where id_user = " + req.body.iduser + " ")];
                    case 5:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    apiController_lectura.prototype.tiempoReal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion2, accion2, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body.tipo == "T")) return [3 /*break*/, 2];
                        return [4 /*yield*/, database_1.default.query("select fecha,t as 'dato' from lectura where id_user = " + req.body.iduser + " order by idlectura desc limit 1")];
                    case 1:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(req.body.tipo == "O")) return [3 /*break*/, 4];
                        return [4 /*yield*/, database_1.default.query("select fecha,o as 'dato' from lectura where id_user = " + req.body.iduser + " order by idlectura desc limit 1")];
                    case 3:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(req.body.tipo == "R")) return [3 /*break*/, 6];
                        return [4 /*yield*/, database_1.default.query("select fecha,r as 'dato' from lectura where id_user = " + req.body.iduser + " order by idlectura desc limit 1")];
                    case 5:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return apiController_lectura;
}());
exports.apiController_lectura_ = new apiController_lectura();
