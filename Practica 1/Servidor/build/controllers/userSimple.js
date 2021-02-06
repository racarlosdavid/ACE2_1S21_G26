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
var apiController_userSimple = /** @class */ (function () {
    function apiController_userSimple() {
    }
    apiController_userSimple.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        res.json({ text: 'Bienvenido a la base de datos MYSQL remoto' });
                        return [2 /*return*/];
                }
            });
        });
    };
    apiController_userSimple.prototype.traerTodos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("select * from usuario")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ usuarios: accion2 });
                        return [2 /*return*/];
                }
            });
        });
    };
    apiController_userSimple.prototype.ingresar_usuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("\n            insert into usuario(nombre, apellido, edad, genero, peso_lb, estatura_cm, contrasena,iduser_couch,email)\n            values (\"" + req.body.nombre + "\", \"" + req.body.apellido + "\", " + req.body.edad + ", \"" + req.body.genero + "\", " + req.body.peso_lb + ", " + req.body.estatura_cm + ", \"" + req.body.contrasena + "\", " + req.body.iduser_couch + ", \"" + req.body.email + "\")\n            ")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ status: "c:", mensaje: "usuario agregado exitosamente" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.json({ status: ":c", mensaje: "error al insertar usuario, intentarlo de nuevo" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    apiController_userSimple.prototype.verificarEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("select email from usuario where email=\"" + req.body.email + "\"")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [2 /*return*/];
                }
            });
        });
    };
    apiController_userSimple.prototype.verificarCredenciales = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("select * from usuario where email=\"" + req.body.email + "\" and contrasena=\"" + req.body.contrasena + "\"")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [2 /*return*/];
                }
            });
        });
    };
    apiController_userSimple.prototype.actualizar_usuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("\n            update usuario set nombre=\"" + req.body.nombre + "\", apellido=\"" + req.body.apellido + "\", edad=" + req.body.edad + ", genero=\"" + req.body.genero + "\", peso_lb=" + req.body.peso_lb + ", estatura_cm=" + req.body.estatura_cm + ", contrasena=\"" + req.body.contrasena + "\" where email=\"" + req.body.email + "\"\n            ")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ status: "c:", respuesta: "el usuario se modifico con exito" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        res.json({ status: ":c", respuesta: "error al modificar el usuario" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    apiController_userSimple.prototype.eliminar_usuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion1, accion2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("use bmaxrefxhz3hp4r9drdu")];
                    case 1:
                        accion1 = _a.sent();
                        return [4 /*yield*/, database_1.default.query("\n        delete from usuario where email=\"" + req.body.email + "\"\n        ")];
                    case 2:
                        accion2 = _a.sent();
                        res.json({ respuesta: accion2 });
                        return [2 /*return*/];
                }
            });
        });
    };
    return apiController_userSimple;
}());
exports.apiController_user_simple_ = new apiController_userSimple();
