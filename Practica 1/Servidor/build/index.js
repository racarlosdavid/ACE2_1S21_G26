"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var user_simple_1 = __importDefault(require("./routes/user_simple"));
var user_couch_1 = __importDefault(require("./routes/user_couch"));
var lectura_1 = __importDefault(require("./routes/lectura"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    };
    Server.prototype.routes = function () {
        this.app.use('/atleta', user_simple_1.default);
        this.app.use('/couch', user_couch_1.default);
        this.app.use('/lectura', lectura_1.default);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('Server on port ', _this.app.get('port'));
        });
    };
    return Server;
}());
exports.server = new Server();
exports.server.start();
