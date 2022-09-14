"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bwip_js_1 = __importDefault(require("bwip-js"));
// Desenha o barcode no PDFKit, esse arquivo eh uma ponte entre bibliotecas
// Utilizamos ts-ignore pois tem um bug no bwip-js
function DrawingPDFKit(doc, opts) {
    // Global graphics state
    var gsDx;
    var gsDy; // x,y translate (padding)
    var addPad = function (X, Y) { return [X + gsDx, Y + gsDy]; };
    function lineTo(x, y) {
        var p = addPad(x, y);
        doc.lineTo(p[0], p[1]);
    }
    function moveTo(x, y) {
        var p = addPad(x, y);
        doc.moveTo(p[0], p[1]);
    }
    return {
        init: function (Width, Height) {
            var padl = opts.paddingwidth || 0;
            var padr = opts.paddingwidth || 0;
            var padt = opts.paddingheight || 0;
            var padb = opts.paddingheight || 0;
            var width = Width + padl + padr;
            var height = Height + padt + padb;
            // Initialize defaults
            doc.save();
            doc.lineCap('butt');
            gsDx = 0;
            gsDy = 0;
            moveTo(0, 0);
            lineTo(width, 0);
            lineTo(width, height);
            lineTo(0, height);
            lineTo(0, 0);
            doc.fillColor("#".concat(opts.backgroundcolor));
            doc.fill('even-odd');
            // Now add in the effects of the padding
            gsDx = padl;
            gsDy = padt;
        },
        // Stuff used internally by bwipjs
        scale: function (_x, _y) { },
        // eslint-disable-next-line no-unused-vars
        measure: function (_str, _font, _fwidth, _fheight) {
            return { width: 0, ascent: 0, descent: 0 }; // we dont use font, no measure
        },
        // Unconnected stroked lines are used to draw the bars in linear barcodes.
        // No line cap should be applied.  These lines are always orthogonal.
        line: function (x0, y0, x1, y1, lw) {
            moveTo(x0, y0);
            lineTo(x1, y1);
            doc.lineWidth(lw).stroke();
        },
        // Polygons are used to draw the connected regions in a 2d barcode.
        // These will always be unstroked, filled, non-intersecting,
        // orthogonal shapes.
        // You will see a series of polygon() calls, followed by a fill().
        polygon: function (pts) {
            moveTo(pts[0][0], pts[0][1]);
            for (var i = 1, n = pts.length; i < n; i += 1) {
                lineTo(pts[i][0], pts[i][1]);
            }
        },
        // PostScript's default fill rule is even-odd.
        fill: function (rgb) {
            doc.fillColor("#".concat(rgb));
            doc.fill('even-odd');
        },
        // Called after all drawing is complete.  The return value from this method
        // is the return value from `bwipjs.render()`.
        end: function () {
            doc.restore();
            return doc;
        },
    };
}
function addCode(doc, x, y, options) {
    doc.save();
    doc.translate(x, y);
    // As declaracoes de tipo do @type/ bwipjs t^em problema
    // @ts-ignore
    bwip_js_1.default.fixupOptions(options);
    // @ts-ignore
    bwip_js_1.default.render(options, DrawingPDFKit(doc, options));
    doc.restore();
}
exports.default = addCode;
