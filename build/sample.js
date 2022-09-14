"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var _1 = require(".");
var remetente = {
    address: {
        NomeLinha1: 'NomeLinha1',
        NomeLinha2: 'NomeLinha2',
        RuaComPrefixo: 'RuaComPrefixo',
        NumeroDaRua: 123,
        Complemento: 'Complemento',
        Bairro: 'Bairro',
        CEP: 'CEP',
        Cidade: 'Cidade',
        Estado: 'SP',
    },
};
var destinatario = {
    address: {
        NomeLinha1: 'NomeLinha1',
        NomeLinha2: 'NomeLinha2',
        RuaComPrefixo: 'RuaComPrefixo',
        NumeroDaRua: 123,
        Complemento: 'Complemento',
        Bairro: 'Bairro',
        CEP: 'CEP',
        Cidade: 'Cidade',
        Estado: 'SP',
    },
};
var base64 = (0, _1.gerarBase64)(remetente, destinatario);
fs_1.default.writeFileSync('rotulo.pdf', base64, 'base64');
