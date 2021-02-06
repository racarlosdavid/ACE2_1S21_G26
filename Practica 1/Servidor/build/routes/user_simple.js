"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userSimple_1 = require("../controllers/userSimple");
var ApiRoutes_userSimple = /** @class */ (function () {
    function ApiRoutes_userSimple() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes_userSimple.prototype.config = function () {
        this.router.get('/', userSimple_1.apiController_user_simple_.traerTodos);
        this.router.post('/update', userSimple_1.apiController_user_simple_.actualizar_usuario);
        this.router.post('/add', userSimple_1.apiController_user_simple_.ingresar_usuario);
        this.router.post('/checkEmail', userSimple_1.apiController_user_simple_.verificarEmail);
        this.router.post('/checkCredential', userSimple_1.apiController_user_simple_.verificarCredenciales);
        this.router.post('/drop', userSimple_1.apiController_user_simple_.eliminar_usuario);
    };
    return ApiRoutes_userSimple;
}());
var apiRoutes_userSimple = new ApiRoutes_userSimple();
exports.default = apiRoutes_userSimple.router;
