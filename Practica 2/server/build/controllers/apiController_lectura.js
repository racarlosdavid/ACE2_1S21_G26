"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiController_lectura = void 0;
var database_1 = __importDefault(require("../database"));
var ApiController_lectura = /** @class */ (function () {
    function ApiController_lectura() {
    }
    ApiController_lectura.prototype.insertar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, database_1.default.query("\n            insert into lectura(iduser,fecha,hora,inhala,exhala,idtest) \n            values(\n                " + req.body.iduser + ",\n                \"" + req.body.fecha + "\",\n                \"" + req.body.hora + "\",\n                " + req.body.inhala + ",\n                " + req.body.exhala + ",\n                (select idtest from usuario where iduser=" + req.body.iduser + ")\n            )\n            ")];
                    case 1:
                        accion = _a.sent();
                        res.json({ text: accion });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.send({ respuesta: "error al insertar una lectura" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiController_lectura.prototype.deleteAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("delete from lectura")];
                    case 1:
                        accion = _a.sent();
                        res.json(accion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController_lectura.prototype.now = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion, x, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, database_1.default.query("select fecha, hora, exhala, inhala from lectura where iduser = " + req.body.iduser + " order by idlectura desc limit 1")];
                    case 1:
                        accion = _a.sent();
                        x = accion[0];
                        res.send(x);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.send({ respuesta: "error al reportar lectura en tiempo real" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiController_lectura.prototype.exhalamin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n        select idtest,min(exhala) as dato from lectura where iduser=" + req.body.iduser + "  group by idtest\n        ")];
                    case 1:
                        accion = _a.sent();
                        res.json(accion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController_lectura.prototype.exhalamax = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n        select idtest,max(exhala) as dato from lectura where iduser=" + req.body.iduser + "  group by idtest\n        ")];
                    case 1:
                        accion = _a.sent();
                        res.json(accion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController_lectura.prototype.exhalaavg = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n        select idtest,avg(exhala) as dato from lectura where iduser=" + req.body.iduser + "  group by idtest\n        ")];
                    case 1:
                        accion = _a.sent();
                        res.json(accion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController_lectura.prototype.inhalamin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n        select idtest,min(inhala) as dato from lectura where iduser=" + req.body.iduser + "  group by idtest\n        ")];
                    case 1:
                        accion = _a.sent();
                        res.json(accion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController_lectura.prototype.inhalamax = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n        select idtest,max(inhala) as dato from lectura where iduser=" + req.body.iduser + "  group by idtest\n        ")];
                    case 1:
                        accion = _a.sent();
                        res.json(accion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController_lectura.prototype.inhalaavg = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n        select idtest,avg(inhala) as dato from lectura where iduser=" + req.body.iduser + "  group by idtest\n        ")];
                    case 1:
                        accion = _a.sent();
                        res.json(accion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController_lectura.prototype.test = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n        select id_test as idtest, fecha, hora from reporte where id_user=" + req.body.iduser + "\n        ")];
                    case 1:
                        accion = _a.sent();
                        res.json(accion);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController_lectura.prototype.grafica = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n        select inhala,exhala,fecha,hora,idtest from lectura where iduser=" + req.body.iduser + "\n        ")];
                    case 1:
                        accion = _a.sent();
                        res.json(accion);
                        return [2 /*return*/];
                }
            });
        });
    };
    return ApiController_lectura;
}());
exports.apiController_lectura = new ApiController_lectura();
