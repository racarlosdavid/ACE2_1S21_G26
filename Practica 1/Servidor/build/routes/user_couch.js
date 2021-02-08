"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userCouch_1 = require("../controllers/userCouch");
var ApiRoutes_userCouch = /** @class */ (function () {
    function ApiRoutes_userCouch() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes_userCouch.prototype.config = function () {
        this.router.post('/', userCouch_1.apiController_user_couch_.asignar);
        this.router.post('/quitar', userCouch_1.apiController_user_couch_.quitarCouch);
        this.router.post('/listaAtleta', userCouch_1.apiController_user_couch_.traerListaAtleta);
    };
    return ApiRoutes_userCouch;
}());
var apiRoutes_userCouch = new ApiRoutes_userCouch();
exports.default = apiRoutes_userCouch.router;
