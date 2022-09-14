"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarBase64 = void 0;
/* eslint-disable no-console */
var drawTest_1 = __importDefault(require("./label/correiosPackage/drawTest"));
var gerarBase64 = function (RemetenteObj, DestinatarioObj) {
    // Cria um PDF
    var pdfCreateFileWithStream = new drawTest_1.default();
    // Roda o teste de desenhar a label
    var base64 = pdfCreateFileWithStream.genBase64(RemetenteObj, DestinatarioObj);
    return base64;
};
exports.gerarBase64 = gerarBase64;
