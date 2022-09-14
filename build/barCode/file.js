"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var bwip_js_1 = __importDefault(require("bwip-js"));
var temp = require("temp");
var BarCodeModel = require("./barcodeModel");
// Arquivo antigo, primeira classe para implementar barcode
// saindo num tempfile .png, sera implementado no futuro
temp.track(); // limpa tempfiles ao sair do node
var BarCodeFileGenerator = /** @class */ (function (_super) {
    __extends(BarCodeFileGenerator, _super);
    function BarCodeFileGenerator() {
        var _this = _super.call(this) || this;
        _this.barcodePath = '';
        return _this;
    }
    BarCodeFileGenerator.prototype.criarCodigo = function (barcodeGen) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedPath;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resolvedPath = '';
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                bwip_js_1.default.toBuffer(barcodeGen, function (err, png) {
                                    if (err) {
                                        if (typeof err === 'string') {
                                            reject(new Error(err));
                                        } // else
                                        reject(err);
                                    }
                                    // `png` is a Buffer
                                    // png.length           : PNG file length
                                    // png.readUInt32BE(16) : PNG image width
                                    // png.readUInt32BE(20) : PNG image height
                                    temp.open('etiquetaCorreios', function (_err, info) { return __awaiter(_this, void 0, void 0, function () {
                                        var tempFile;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (_err) {
                                                        if (typeof _err === 'string') {
                                                            reject(new Error(_err));
                                                        } // else
                                                        reject(_err);
                                                    }
                                                    return [4 /*yield*/, fs_1.default.promises.open(info.path, 'w')];
                                                case 1:
                                                    tempFile = _a.sent();
                                                    return [4 /*yield*/, fs_1.default.promises.writeFile(tempFile, png)];
                                                case 2:
                                                    _a.sent();
                                                    fs_1.default.close(info.fd, function (__err) {
                                                        if (_err)
                                                            reject(new Error(__err === null || __err === void 0 ? void 0 : __err.message));
                                                    }); // else
                                                    resolvedPath = info.path;
                                                    resolve();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                });
                            })];
                    case 1:
                        _a.sent();
                        if (!resolvedPath)
                            throw new Error('Erro ao criar QR Code!');
                        this.barcodePath = resolvedPath;
                        return [2 /*return*/];
                }
            });
        });
    };
    BarCodeFileGenerator.prototype.generateDatamatrix = function (CepDestino, NumeroRuaDestino, CepRemetente, NumeroRuaRemetente) {
        return __awaiter(this, void 0, void 0, function () {
            var barcodeData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        barcodeData = _super.prototype.createDatamatrix.call(this, CepDestino, NumeroRuaDestino, CepRemetente, NumeroRuaRemetente);
                        return [4 /*yield*/, this.criarCodigo(barcodeData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.barcodePath];
                }
            });
        });
    };
    BarCodeFileGenerator.prototype.generateCode128 = function (CepDestino) {
        return __awaiter(this, void 0, void 0, function () {
            var barCodeData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        barCodeData = _super.prototype.createCode128.call(this, CepDestino);
                        return [4 /*yield*/, this.criarCodigo(barCodeData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.barcodePath];
                }
            });
        });
    };
    return BarCodeFileGenerator;
}(BarCodeModel.default));
exports.default = BarCodeFileGenerator;
