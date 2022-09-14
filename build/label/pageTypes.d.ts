/// <reference types="pdfkit" />
declare type TextOptions = PDFKit.Mixins.TextOptions;
declare type coordinates<M extends string = "0" | "1"> = {
    [k in M]: number;
} & {
    length: 2;
} & ReadonlyArray<number>;
declare const enum coord {
    "x" = 0,
    "y" = 1
}
declare const enum positionOnPage {
    "topLeft" = 0,
    "topRight" = 1,
    "bottomLeft" = 2,
    "bottomRight" = 3
}
declare type BrazilState = "AC" | "AL" | "AM" | "AP" | "BA" | "CE" | "DF" | "ES" | "GO" | "MA" | "MT" | "MS" | "MG" | "PA" | "PB" | "PR" | "PE" | "PI" | "RJ" | "RN" | "RO" | "RS" | "RR" | "SC" | "SE" | "SP" | "TO" | string;
interface address {
    NomeLinha1: string;
    NomeLinha2: string;
    RuaComPrefixo: string;
    NumeroDaRua: number;
    Complemento?: string;
    Bairro: string;
    CEP: string;
    Cidade: string;
    Estado: BrazilState;
}
interface sender {
    address: address;
}
interface recipient {
    address: address;
}
export { coordinates, coord, positionOnPage, TextOptions, BrazilState, sender, recipient };
