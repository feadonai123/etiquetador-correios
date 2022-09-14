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
var labelModel_1 = __importDefault(require("../labelModel"));
var barcodeModel_1 = __importDefault(require("../../barCode/barcodeModel"));
var drawStream_1 = __importDefault(require("../../barCode/drawStream"));
var DrawLabel = /** @class */ (function (_super) {
    __extends(DrawLabel, _super);
    function DrawLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Desenha a etiqueta do correios, ate 4 por pagina
    DrawLabel.prototype.drawGluedLabelPlaceholder = function () {
        this.lastY = 0;
        var cornerSize = 12; // Tamanho do canto do retangulo
        var widthBetweenCorners = 260; // Largura da caixa - cornerSize - marginLeft
        var heightBetweenCorners = 139; // tamanho da caixa - cornerSize - marginLeft
        // Tamanho total da caixa
        var labelWidth = widthBetweenCorners + cornerSize * 2;
        var startDrawing = this.offsetX + this.marginLeft;
        var lineGap = 3; // Espaco entre os dois textos do placeholder de etiqueta
        var textY = 69; // Y do 'USO EXCLUSIVO DO CORREIOS' (incluindo marginTop)
        // Seguimos a mesma ordem que as bordas no CSS seguem
        var topLeftCorner = [
            startDrawing,
            this.marginTop + cornerSize + this.offsetY,
        ];
        var topRightCorner = [
            startDrawing + cornerSize + widthBetweenCorners,
            this.marginTop + this.offsetY,
        ];
        var bottomRightCorner = [
            topRightCorner[0 /* coord.x */] + cornerSize,
            this.marginTop + cornerSize + heightBetweenCorners + this.offsetY,
        ];
        var bottomLeftCorner = [
            startDrawing + cornerSize,
            cornerSize + bottomRightCorner[1 /* coord.y */],
        ];
        this.lastY = bottomLeftCorner[1 /* coord.y */];
        /* NOTA: Eu me asseguro pessoalmente de que todos esses parametros spread
         * t^em obrigat`oriamente dois argumentos satisfeitos pelo tipo coordinates.
         * O motivo pelos operadores rest estarem comentados eh porque o typescript
         * ainda nao suporta operadores rest adequadamente (mesmo usando array fixa)
         */
        var X = topLeftCorner[0], Y = topLeftCorner[1]; // Can TypeScript support rest please?!
        // A razao para nao utilizar spread aqui eh que usando
        // vscode no typescript nao eh suportado propriamente
        this.doc.moveTo(/* ...topLeftCorner */ X, Y);
        topLeftCorner[1 /* coord.y */] -= cornerSize;
        Y = topLeftCorner[1];
        this.doc
            .lineCap('butt')
            .lineTo(/* ...topLeftCorner */ X, Y)
            .lineTo(topLeftCorner[0 /* coord.x */] + cornerSize, topLeftCorner[1 /* coord.y */])
            .stroke('black');
        X = topRightCorner[0], Y = topRightCorner[1];
        this.doc.moveTo(/* ...topRightCorner */ X, Y);
        topRightCorner[0 /* coord.x */] += cornerSize;
        X = topRightCorner[0];
        this.doc
            .lineCap('butt')
            .lineTo(/* ...topRightCorner */ X, Y)
            .lineTo(topRightCorner[0 /* coord.x */], topRightCorner[1 /* coord.y */] + cornerSize)
            .stroke('black');
        X = bottomRightCorner[0], Y = bottomRightCorner[1];
        this.doc.moveTo(/* ...bottomRightCorner */ X, Y);
        bottomRightCorner[1 /* coord.y */] += cornerSize;
        Y = bottomRightCorner[1];
        this.doc
            .lineCap('butt')
            .lineTo(/* ...bottomRightCorner */ X, Y)
            .lineTo(bottomRightCorner[0 /* coord.x */] - cornerSize, bottomRightCorner[1 /* coord.y */])
            .stroke('black');
        X = bottomLeftCorner[0], Y = bottomLeftCorner[1];
        this.doc.moveTo(/* ...bottomLeftCorner */ X, Y);
        bottomLeftCorner[0 /* coord.x */] -= cornerSize;
        X = bottomLeftCorner[0];
        this.doc
            .lineCap('butt')
            .lineTo(/* ...bottomLeftCorner */ X, Y)
            .lineTo(bottomLeftCorner[0 /* coord.x */], bottomLeftCorner[1 /* coord.y */] - cornerSize)
            .stroke('black');
        // Colocar texto no placeholder da etiqueta colada
        var opts = {
            align: 'center',
            width: labelWidth,
            characterSpacing: this.characterSpacingBig,
            lineGap: lineGap,
        };
        this.doc.font('Helvetica').fontSize(this.fontSizeBig).fill('black').text('USO EXCLUSIVO DOS CORREIOS', startDrawing, // X
        textY + this.offsetY, opts); // Y
        opts.characterSpacing = this.characterSpacingSmall;
        this.doc.fontSize(this.fontSizeSmall).text('Cole aqui a etiqueta com o código identificador da encomenda', startDrawing, undefined, // Relativo ao texto anterior
        opts);
    };
    DrawLabel.prototype.drawSignReceipt = function () {
        // Desenha onde voce deve assinar na entrega
        var paddingTop = 7;
        this.lastY += paddingTop;
        var labelEnd = this.offsetX + this.halfPage - this.marginLeft + 1;
        var startDrawing = this.offsetX + this.marginLeft;
        var text = 'Recebedor:';
        var opts = {
            align: 'left',
            characterSpacing: this.characterSpacingSmall,
        };
        this.doc
            .fontSize(this.fontSizeSmall)
            .text(text, startDrawing, this.lastY, opts);
        var startAfterText = 1 + startDrawing + this.doc.widthOfString(text, opts);
        this.lastY -= 2; // Ajustezinho pra ficar mais fiel
        this.lastY += this.doc.heightOfString(text, opts);
        this.doc
            .moveTo(startAfterText, this.lastY)
            .lineCap('butt')
            .lineTo(labelEnd, this.lastY)
            .stroke('black');
        text = 'Assinatura:';
        this.lastY += paddingTop;
        this.doc
            .fontSize(this.fontSizeSmall)
            .text(text, startDrawing, this.lastY, opts);
        var textY = this.lastY;
        startAfterText = 1 + startDrawing + this.doc.widthOfString(text, opts);
        var endDrawing = this.offsetX + Math.round((labelEnd - 1 - startDrawing) / 2);
        this.lastY -= 2; // Ajustezinho pra ficar mais fiel
        this.lastY += this.doc.heightOfString(text, opts);
        this.doc
            .moveTo(startAfterText, this.lastY)
            .lineCap('butt')
            .lineTo(endDrawing, this.lastY)
            .stroke('black');
        text = 'Documento:';
        startDrawing = endDrawing + 2;
        this.doc.fontSize(this.fontSizeSmall).text(text, startDrawing, textY, opts);
        startAfterText = 1 + startDrawing + this.doc.widthOfString(text, opts);
        opts.indent = undefined;
        this.doc
            .moveTo(startAfterText, this.lastY)
            .lineCap('butt')
            .lineTo(labelEnd, this.lastY)
            .stroke('black');
    };
    DrawLabel.prototype.drawShipToNeighbor = function (text) {
        // Desenha a caixa de entrega ao vizinho
        var marginTop = 9;
        var boxHeight = 30;
        var paddingTextX = 5;
        var textBoxHeight = Math.round(boxHeight / 2) - 1;
        var labelWidth = this.halfPage - this.marginLeft * 2;
        this.lastY += marginTop;
        this.doc
            .rect(this.marginLeft + this.offsetX, this.lastY, labelWidth, boxHeight)
            .stroke('black');
        var opts = {
            align: 'left',
            characterSpacing: this.characterSpacingSmall,
        };
        var Text = 'ENTREGA NO VIZINHO AUTORIZADA?';
        var textWidth = this.doc.widthOfString(Text, opts);
        var textYOnBox = textBoxHeight - 10;
        this.doc
            .rect(this.marginLeft + this.offsetX, this.lastY, textWidth + paddingTextX * 2, textBoxHeight)
            .fill('black');
        this.doc
            .font('Helvetica-Bold')
            .fontSize(this.fontSizeSmall)
            .fill('white')
            .text(Text, this.marginLeft + this.offsetX + paddingTextX, this.lastY + textYOnBox, opts);
        Text = text || 'Não entregar ao vizinho';
        this.doc
            .font('Helvetica')
            .fill('black')
            .text(Text, this.marginLeft + this.offsetX + paddingTextX, // Mesmo x que "Entrega ao ..."
        this.lastY + Math.round(boxHeight) / 2 + textYOnBox, opts); // TODO FIXME WARN: Verificar contra a etiqueta original
        this.lastY += textBoxHeight + 20;
    };
    DrawLabel.prototype.drawRecipientBox = function () {
        // Desenha a caixa do Destinatario e o textinho com fundo preto
        var addressContainerHeight = 120;
        var addressContainerWidth = 202;
        var textBoxHeight = 15;
        var paddingTextX = this.offsetX + this.marginLeft;
        this.doc
            .rect(paddingTextX, this.lastY, addressContainerWidth, addressContainerHeight)
            .stroke('black');
        var opts = {
            align: 'left',
            characterSpacing: this.characterSpacingBig,
        };
        this.doc.font('Helvetica-Bold').fontSize(this.fontSizeBig);
        var Text = 'DESTINATÁRIO';
        var textWidth = this.doc.widthOfString(Text, opts);
        var textYOnBox = textBoxHeight - 11;
        this.doc
            .rect(this.marginLeft + this.offsetX, this.lastY, textWidth + 10, textBoxHeight)
            .fill('black');
        this.doc
            .font('Helvetica-Bold')
            .fontSize(this.fontSizeBig)
            .fill('white')
            .text(Text, this.marginLeft + this.offsetX + 5, this.lastY + textYOnBox, opts);
        this.lastY += textBoxHeight;
    };
    DrawLabel.prototype.drawDatamatrix = function () {
        // Desenha o QR Code
        var x = this.offsetX + 215;
        var y = this.lastY;
        // Creates a dataMatrix object
        var barcodeGenerator = new barcodeModel_1.default();
        var datamatrix = barcodeGenerator.createDatamatrix('80310-160', 31337, '80310-160', 31337);
        (0, drawStream_1.default)(this.doc, x, y, datamatrix);
    };
    DrawLabel.prototype.drawCode128 = function () {
        // Desenha o BarCode (code128)
        var x = this.offsetX + 37;
        var y = this.lastY + 60;
        var barcodeGenerator = new barcodeModel_1.default();
        var code128 = barcodeGenerator.createCode128('80310-160');
        (0, drawStream_1.default)(this.doc, x, y, code128);
    };
    DrawLabel.prototype.drawAddressText = function (cepSize, nameLine1, nameLine2, street, streetNumber, complement, neighborhood, cep, city, state, drawSender) {
        if (drawSender === void 0) { drawSender = false; }
        // Desenha o texto do endereco com os parametros, utilizado tanto pelo
        // remetente quanto pelo destinatario, drawSender diz se eh remetente
        var offsetY = 3;
        var offesetX = 5;
        var spaceBetweenLines = 8;
        var opts = {
            align: 'left',
            characterSpacing: this.characterSpacingSmall,
            lineBreak: false, // Evitar que o texto va para proxima pagina
        };
        if (drawSender) {
            this.doc
                .font('Helvetica-Bold')
                .fill('Black')
                .text('Remetente:', this.offsetX + this.marginLeft + offesetX, this.lastY + offsetY)
                .font('Helvetica')
                .fontSize(this.fontSizeSmall)
                .text("".concat(nameLine1, "\n"), this.offsetX + this.marginLeft + offesetX + 46, this.lastY + offsetY);
        }
        else {
            this.doc
                .fill('black')
                .font('Helvetica')
                .fontSize(this.fontSizeSmall)
                .text("".concat(nameLine1, "\n"), this.offsetX + this.marginLeft + offesetX, this.lastY + offsetY);
        }
        if (nameLine2) {
            this.doc.text("".concat(nameLine2), this.offsetX + this.marginLeft + offesetX, this.lastY + offsetY + spaceBetweenLines, opts);
        }
        this.doc.text("".concat(street, " ").concat(streetNumber), this.offsetX + this.marginLeft + offesetX, this.lastY + offsetY + spaceBetweenLines * 2, opts);
        if (drawSender) {
            // caso desenhamos o sender, queremos grudar complemento
            // e bairro, cep e cidade
            if (complement) {
                this.doc.text("".concat(complement, "  ").concat(neighborhood), this.offsetX + this.marginLeft + offesetX, this.lastY + offsetY + spaceBetweenLines * 3, opts);
            }
            else {
                this.doc.text("".concat(neighborhood), this.offsetX + this.marginLeft + offesetX, this.lastY + offsetY + spaceBetweenLines * 3, opts);
            }
        }
        else {
            if (complement) {
                // complemento eh opcional, quando nao temos ele,
                // desenhamos o bairro no comeco da linha
                this.doc.text("".concat(complement), this.offsetX + this.marginLeft + offesetX, this.lastY + offsetY + spaceBetweenLines * 3, opts);
            }
            this.doc
                .fontSize(this.fontSizeSmall - 1)
                .text("".concat(neighborhood), this.offsetX + this.marginLeft + offesetX + 60, this.lastY + offsetY + spaceBetweenLines * 3 + 1, opts);
        }
        this.doc
            .fontSize(cepSize)
            .font('Helvetica-Bold')
            .text(cep, this.offsetX + this.marginLeft + offesetX, this.lastY + offsetY + spaceBetweenLines * 4 + 1, opts);
        this.doc
            .font('Helvetica');
        if (drawSender) {
            // posicao do cidade - PR (Cidade, estado) fica diferente
            this.doc
                .text("".concat(city, " - ").concat(state), this.offsetX + this.marginLeft + offesetX + 44, // logo apos o cep
            this.lastY + offsetY + spaceBetweenLines * 4 + 1, opts);
        }
        else {
            this.doc
                .fontSize(this.fontSizeSmall)
                .text("".concat(city, " - ").concat(state), this.offsetX + this.marginLeft + offesetX + 60, // bem depois do cep
            this.lastY + offsetY + spaceBetweenLines * 4 + 1, opts);
        }
    };
    DrawLabel.prototype.drawRecipientText = function (nameLine1, nameLine2, street, streetNumber, complement, neighborhood, cep, city, state) {
        // Desenha o endereco do destinatario
        this.drawAddressText(this.fontSizeSmall + 2, nameLine1, nameLine2, street, streetNumber, complement, neighborhood, cep, city, state);
    };
    DrawLabel.prototype.drawSenderText = function (nameLine1, nameLine2, street, streetNumber, complement, neighborhood, cep, city, state) {
        // texto do remetente, fica embaixo da etiqueta com barcode
        this.lastY += 105;
        this.drawAddressText(this.fontSizeSmall, nameLine1, nameLine2, street, streetNumber, complement, neighborhood, cep, city, state, true);
    };
    return DrawLabel;
}(labelModel_1.default));
exports.default = DrawLabel;
