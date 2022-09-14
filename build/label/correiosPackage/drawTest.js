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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var drawStream_1 = __importDefault(require("./drawStream"));
// Cria um arquivo PDF para testes manuais e gera o arquivo
// /tmp/lol.pdf para prototipar
// TODO: Refatorar pra for, suportar mais de uma pagina
var DrawTest = /** @class */ (function (_super) {
    __extends(DrawTest, _super);
    function DrawTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrawTest.prototype.drawLabel = function (Sender, Recipient) {
        if (Sender && Recipient) {
            this.drawGluedLabelPlaceholder();
            this.drawSignReceipt();
            this.drawShipToNeighbor();
            this.drawDatamatrix();
            this.drawCode128();
            this.drawRecipientBox();
            this.drawRecipientText(Recipient.address.NomeLinha1, Recipient.address.NomeLinha2, Recipient.address.RuaComPrefixo, Recipient.address.NumeroDaRua, Recipient.address.Complemento, Recipient.address.Bairro, Recipient.address.CEP, Recipient.address.Cidade, Recipient.address.Estado);
            this.drawSenderText(Sender.address.NomeLinha1, Sender.address.NomeLinha2, Sender.address.RuaComPrefixo, Sender.address.NumeroDaRua, Sender.address.Complemento, Sender.address.Bairro, Sender.address.CEP, Sender.address.Cidade, Sender.address.Estado);
        }
    };
    DrawTest.prototype.genBase64 = function (sender1, recipient1, sender2, recipient2, sender3, recipient3, sender4, recipient4) {
        if (!(sender1 && recipient1)
            && !(sender2 && recipient2)
            && !(sender3 && recipient3)
            && !(sender4 && recipient4)) {
            throw new Error('Preciso de pelo menos um par consecutivo de destinatario e remetente!');
        }
        // Entry point to output PDF
        this.drawLabel(sender1, recipient1);
        this.drawLabel(sender2, recipient2);
        this.drawLabel(sender3, recipient3);
        this.drawLabel(sender4, recipient4);
        this.doc.end();
        return this.doc.read().toString('base64');
    };
    return DrawTest;
}(drawStream_1.default));
exports.default = DrawTest;
