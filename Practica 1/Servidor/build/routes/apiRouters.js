"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_userSimple_1 = require("../controllers/apiController_userSimple");
var ApiRoutes_userSimple = /** @class */ (function () {
    function ApiRoutes_userSimple() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes_userSimple.prototype.config = function () {
        this.router.get('/', apiController_userSimple_1.apiController_iser1_simple.index);
        this.router.get('/usuario/getAll', apiController_userSimple_1.apiController_iser1_simple.consulta1);
    };
    return ApiRoutes_userSimple;
}());
var apiRoutes_userSimple = new ApiRoutes_userSimple();
exports.default = apiRoutes_userSimple.router;
