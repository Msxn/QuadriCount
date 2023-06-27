"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var quadricountController_1 = require("./controller/quadricount/quadricountController");
var express = require("express");
var mongoose = require('mongoose');
var app = express();
var port = 3001;
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.get("/", function (req, res) { return res.send("Hello World!"); });
app.get("/quadricount/", function (req, res) { return quadricountController_1.QuadricountController.findAllCounts(req, res); });
app.get("/quadricount/:id", function (req, res) { return quadricountController_1.QuadricountController.findCount(req, res); });
app.post("/quadricount/create", function (req, res) { return quadricountController_1.QuadricountController.createCount(req, res); });
app.get("/quadricount/delete/:id", function (req, res) { return quadricountController_1.QuadricountController.deleteCount(req, res); });
app.post("/quadricount/update/count/:id", function (req, res) { return quadricountController_1.QuadricountController.updateCount(req, res); });
app.post("/quadricount/update/category/:id", function (req, res) { return quadricountController_1.QuadricountController.updateCategory(req, res); });
app.post("/quadricount/update/contributors/:id", function (req, res) { return quadricountController_1.QuadricountController.updateContributors(req, res); });
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port, "!"));
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose.connect("mongodb://localhost:27017/QuadriCount")];
                case 1:
                    _a.sent();
                    console.log("console ok");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) { return console.log(err); });
//# sourceMappingURL=app.js.map