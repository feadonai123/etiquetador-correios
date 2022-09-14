"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BarCodeModel = /** @class */ (function () {
    function BarCodeModel() {
        this.sanitizedCep = '';
    }
    BarCodeModel.prototype.sanitizeCep = function (cep) {
        var sanitizedCep = cep.trim();
        if (cep.indexOf('-') !== -1) {
            sanitizedCep = sanitizedCep.replace('-', '').trim();
        }
        if (!/[0-9]{8,8}/.test(sanitizedCep)) {
            throw new Error('Formato de CEP incorreto!');
        }
        this.sanitizedCep = sanitizedCep;
    };
    BarCodeModel.prototype.createDatamatrix = function (CepDestino, NumeroRuaDestino, CepRemetente, NumeroRuaRemetente) {
        // Cria um objeto DataMatrix de acordo com as especificacoes do correios
        // e como eles implementam, precisamos ligar para o correios pra testar
        // Sanitizar CEPs
        this.sanitizeCep(CepDestino);
        var cepDestino = this.sanitizedCep;
        this.sanitizeCep(CepRemetente);
        var cepRemetente = this.sanitizedCep;
        // TODO: Suportar string e converter pra numero
        if (NumeroRuaDestino > 99999 || NumeroRuaRemetente > 99999) {
            throw new Error('Erro: Número de rua muito alto');
        }
        var numeroRuaDestino = String(NumeroRuaDestino).padStart(5, '0');
        var numeroRuaRemetente = String(NumeroRuaRemetente).padStart(5, '0');
        // Calcular a soma de digitos do checksum
        // TODO: Testar mais, contra o pdf do correios
        var checkSum = 0;
        cepDestino.split('').forEach(function (d) {
            var digit = parseInt(d, 10);
            checkSum += digit;
            if (checkSum >= 10) {
                checkSum -= 10;
            }
        });
        checkSum = 10 - checkSum;
        var checkSumCepDestino = String(checkSum);
        // Formatar o DataMatrix
        var datamatrix = {
            cepDestino: cepDestino,
            numeroRuaDestino: numeroRuaDestino,
            cepRemetente: cepRemetente,
            numeroRuaRemetente: numeroRuaRemetente,
            checkSumCepDestino: checkSumCepDestino,
        };
        var data = "".concat(datamatrix.cepDestino).concat(datamatrix.numeroRuaDestino).concat(datamatrix.cepRemetente).concat(datamatrix.numeroRuaRemetente).concat(datamatrix.checkSumCepDestino).padEnd(126, '0');
        return {
            bcid: 'datamatrix',
            text: data,
            backgroundcolor: 'FFFFFF',
            scaleX: 1,
            scaleY: 1,
            width: 25,
            height: 25,
            paddingwidth: 1,
            paddingheight: 1,
            includetext: false,
        };
    };
    BarCodeModel.prototype.createCode128 = function (CepDestino) {
        // cria um objeto de configuracao pra gerar um BarCode 128
        this.sanitizeCep(CepDestino);
        var cepDestino = this.sanitizedCep;
        return {
            bcid: 'code128',
            text: cepDestino,
            backgroundcolor: 'FFFFFF',
            scaleX: 1,
            scaleY: 1,
            width: 46,
            height: 20,
            paddingwidth: 5,
            includetext: false,
            includecheck: true,
        };
    };
    return BarCodeModel;
}());
exports.default = BarCodeModel;
