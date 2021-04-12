"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_1 = require("../controllers/apiController");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes.prototype.config = function () {
        this.router.get('/', apiController_1.apiController.index);
        this.router.get('/consulta1', apiController_1.apiController.consulta1);
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
