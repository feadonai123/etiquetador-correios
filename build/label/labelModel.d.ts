import PDFKit from 'pdfkit';
import { positionOnPage } from './pageTypes';
declare class LabelModel {
    protected readonly doc: typeof PDFKit;
    protected label: positionOnPage;
    protected lastY: number;
    protected readonly pageWidth: number;
    protected readonly pageHeight: number;
    protected readonly halfPage: number;
    protected readonly marginTop: number;
    protected readonly marginLeft: number;
    protected readonly fontSizeSmall: number;
    protected readonly characterSpacingSmall: number;
    protected readonly characterSpacingBig: number;
    protected readonly fontSizeBig: number;
    constructor();
    protected get offsetX(): number;
    protected get offsetY(): number;
    protected nextLabel(label?: number): void;
}
export default LabelModel;
