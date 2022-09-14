"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pdfkit_1 = __importDefault(require("pdfkit"));
var LabelModel = /** @class */ (function () {
    function LabelModel() {
        this.doc = new pdfkit_1.default({
            bufferPages: true,
            size: 'A4',
            margin: 0,
            layout: 'portrait',
        });
        this.pageWidth = this.doc.page.width; // A4
        this.pageHeight = this.doc.page.height;
        this.halfPage = Math.round(this.pageWidth / 2);
        this.label = 0 /* positionOnPage.topLeft */; // primeira label
        this.lastY = 0;
        // propriedades de estilo que persistem em mais de um elemento da etiqueta
        this.marginTop = 12;
        this.marginLeft = 9;
        this.fontSizeSmall = 8.2;
        this.characterSpacingSmall = 0;
        this.characterSpacingBig = 0.2;
        this.fontSizeBig = 10;
    }
    Object.defineProperty(LabelModel.prototype, "offsetX", {
        get: function () {
            // Retorna a posicao x  de acordo com o numero da etiqueta
            // que estamos alterando (plotamos 1/4 da pagina)
            return (this.label === 1 /* positionOnPage.topRight */
                || this.label === 3 /* positionOnPage.bottomRight */
                // Se for a segunda etiqueta, elementos posicionados apos metade da pagina
                ? this.halfPage - this.marginLeft
                : 0); // Caso nao, coloque no inicio da pagina
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LabelModel.prototype, "offsetY", {
        get: function () {
            // Retorna a posicao y de acordo com o numero da etiqueta
            // que estamos alterando (plotamos 1/4 da pagina)
            return this.label === 2 /* positionOnPage.bottomLeft */ ||
                this.label === 3 /* positionOnPage.bottomRight */
                ? Math.round(this.pageHeight / 2) - this.marginTop
                : 0;
        },
        enumerable: false,
        configurable: true
    });
    LabelModel.prototype.nextLabel = function (label) {
        // Plotamos 1/4 da pagina, funcao de controle da posicao
        // de etiqueta que estamos plotando
        var Label = label || this.label + 1;
        this.label = Label;
    };
    return LabelModel;
}());
exports.default = LabelModel;
