"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var lectura_1 = require("../controllers/lectura");
var ApiRoutes_lectura = /** @class */ (function () {
    function ApiRoutes_lectura() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes_lectura.prototype.config = function () {
        this.router.post('/', lectura_1.apiController_lectura_.agregar);
        this.router.post('/historial', lectura_1.apiController_lectura_.historial);
        this.router.post('/historialMax', lectura_1.apiController_lectura_.historialMaximo);
        this.router.post('/historialMin', lectura_1.apiController_lectura_.historialMinimo);
        this.router.post('/historialProm', lectura_1.apiController_lectura_.historialPromedio);
        this.router.post('/now', lectura_1.apiController_lectura_.tiempoReal);
    };
    return ApiRoutes_lectura;
}());
var apiRoutes_lectura = new ApiRoutes_lectura();
exports.default = apiRoutes_lectura.router;
