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
exports.apiController = void 0;
var database_1 = __importDefault(require("../database"));
var ApiController = /** @class */ (function () {
    function ApiController() {
    }
    ApiController.prototype.c_usuario_ingresar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, database_1.default.query("\n            INSERT into usuario (correo,contrasena,nombre,apellido,edad,genero,peso_lb,estatura_cm,estado_sesion,estado_couch,iduser_couch) VALUES   \n            (\"" + req.body.correo + "\", \n            \"" + req.body.contrasena + "\", \n            \"" + req.body.nombre + "\", \n            \"" + req.body.apellido + "\",\n            " + req.body.edad + ",\n            \"" + req.body.genero + "\",\n            " + req.body.peso_lb + ",\n            " + req.body.estatura_cm + ",\n            " + req.body.estado_sesion + ",\n            " + req.body.estado_couch + ",\n            " + req.body.iduser_couch + ")\n            ")];
                    case 1:
                        accion = _a.sent();
                        res.send(accion);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.send({ respuesta: "error al ingresar usuario" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.modificar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, database_1.default.query("\n            update usuario set \n            contrasena=\"" + req.body.contrasena + "\",\n            edad=" + req.body.edad + " ,\n            peso_lb=" + req.body.peso_lb + " ,\n            estatura_cm=" + req.body.estatura_cm + "\n        \n            where iduser=" + req.body.iduser + "\n            ")];
                    case 1:
                        accion = _a.sent();
                        res.send(accion);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.send({ respuesta: "error al modificar usuario" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.c_traer_todos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, database_1.default.query("\n            select * from usuario\n            ")];
                    case 1:
                        accion = _a.sent();
                        res.send(accion);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.send({ respuesta: "error al traer todos los usuarios" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.c_login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion, accion1, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.query("\n            select * from usuario where correo=\"" + req.body.correo + "\" and contrasena=\"" + req.body.contrasena + "\"\n            ")];
                    case 1:
                        accion = _a.sent();
                        if (!(accion.length != 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, database_1.default.query("update usuario set estado_sesion = '1' where correo=\"" + req.body.correo + "\" and contrasena=\"" + req.body.contrasena + "\" ")];
                    case 2:
                        accion1 = _a.sent();
                        res.send({ respuesta: "true", usuario: accion[0] });
                        return [2 /*return*/];
                    case 3:
                        res.send({ respuesta: "false" });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        res.send({ respuesta: "no se pudo verificar las credenciales" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.incrementar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var accion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query("\n        update usuario set id_test_contador = id_test_contador +1  where iduser=" + req.body.iduser + "\n        ")];
                    case 1:
                        accion = _a.sent();
                        res.json({ text: accion });
                        return [2 /*return*/];
                }
            });
        });
    };
    return ApiController;
}());
exports.apiController = new ApiController();
