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
        this.router.post('/now', apiController_lectura_1.apiController_lectura.now);
        this.router.get('/delete', apiController_lectura_1.apiController_lectura.deleteAll);
        this.router.post('/exhalamin', apiController_lectura_1.apiController_lectura.exhalamin);
        this.router.post('/exhalamax', apiController_lectura_1.apiController_lectura.exhalamax);
        this.router.post('/exhalaavg', apiController_lectura_1.apiController_lectura.exhalaavg);
        this.router.post('/inhalamin', apiController_lectura_1.apiController_lectura.inhalamin);
        this.router.post('/inhalamax', apiController_lectura_1.apiController_lectura.inhalamax);
        this.router.post('/inhalaavg', apiController_lectura_1.apiController_lectura.inhalaavg);
        this.router.post('/test', apiController_lectura_1.apiController_lectura.test);
        this.router.post('/grafica', apiController_lectura_1.apiController_lectura.grafica);
    };
    return ApiRoutes_lectura;
}());
var apiRoutes_lectura = new ApiRoutes_lectura();
exports.default = apiRoutes_lectura.router;
