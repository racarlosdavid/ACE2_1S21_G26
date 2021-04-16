"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_couch_1 = require("../controllers/apiController_couch");
var ApiRoutes_couch = /** @class */ (function () {
    function ApiRoutes_couch() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes_couch.prototype.config = function () {
        this.router.get('/', apiController_couch_1.apiController_couch.getTodos);
        this.router.post('/', apiController_couch_1.apiController_couch.asignarCouch);
        this.router.post('/team', apiController_couch_1.apiController_couch.team);
    };
    return ApiRoutes_couch;
}());
var apiRoutes_couch = new ApiRoutes_couch();
exports.default = apiRoutes_couch.router;
