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
        this.router.get('/', apiController_1.apiController.c_traer_todos);
        this.router.post('/add', apiController_1.apiController.c_usuario_ingresar);
        this.router.post('/checkCredential', apiController_1.apiController.c_login);
        this.router.post('/startTest', apiController_1.apiController.incrementar);
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
