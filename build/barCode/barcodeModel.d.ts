import bwipjs from 'bwip-js';
declare class BarCodeModel {
    protected sanitizedCep: string;
    constructor();
    private sanitizeCep;
    createDatamatrix(CepDestino: string, NumeroRuaDestino: number, CepRemetente: string, NumeroRuaRemetente: number): bwipjs.ToBufferOptions;
    createCode128(CepDestino: string): bwipjs.ToBufferOptions;
}
export default BarCodeModel;
