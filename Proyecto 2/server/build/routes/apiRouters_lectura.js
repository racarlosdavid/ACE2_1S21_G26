"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_lectura_1 = require("../controllers/apiController_lectura");
var ApiRoutes_lectura = /** @class */ (function () {
    function ApiRoutes_lectura() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes_lectura.prototype.config = function () {
        this.router.post('/', apiController_lectura_1.apiController_lectura.insertar);
        this.router.get('/delete', apiController_lectura_1.apiController_lectura.deleteAll);
        this.router.post('/now', apiController_lectura_1.apiController_lectura.now);
        this.router.post('/min', apiController_lectura_1.apiController_lectura.min);
        this.router.post('/max', apiController_lectura_1.apiController_lectura.max);
        this.router.post('/avg', apiController_lectura_1.apiController_lectura.avg);
        this.router.post('/minAll', apiController_lectura_1.apiController_lectura.minall);
        this.router.post('/maxAll', apiController_lectura_1.apiController_lectura.maxall);
        this.router.post('/avgAll', apiController_lectura_1.apiController_lectura.avgall);
        this.router.post('/reporteTest', apiController_lectura_1.apiController_lectura.reporteIdTest);
        this.router.post('/golpes', apiController_lectura_1.apiController_lectura.golpes);
    };
    return ApiRoutes_lectura;
}());
var apiRoutes_lectura = new ApiRoutes_lectura();
exports.default = apiRoutes_lectura.router;
