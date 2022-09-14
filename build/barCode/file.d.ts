import BarCodeModel = require('./barcodeModel');
declare class BarCodeFileGenerator extends BarCodeModel.default {
    private barcodePath;
    constructor();
    private criarCodigo;
    generateDatamatrix(CepDestino: string, NumeroRuaDestino: number, CepRemetente: string, NumeroRuaRemetente: number): Promise<string>;
    generateCode128(CepDestino: string): Promise<string>;
}
export default BarCodeFileGenerator;
