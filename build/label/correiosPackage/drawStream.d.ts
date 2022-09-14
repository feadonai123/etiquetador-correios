import { BrazilState } from '../pageTypes';
import LabelModel from '../labelModel';
declare class DrawLabel extends LabelModel {
    protected drawGluedLabelPlaceholder(): void;
    protected drawSignReceipt(): void;
    protected drawShipToNeighbor(text?: string): void;
    protected drawRecipientBox(): void;
    protected drawDatamatrix(): void;
    protected drawCode128(): void;
    protected drawAddressText(cepSize: number, nameLine1: string, nameLine2: string | undefined, street: string, streetNumber: number, complement: string | undefined, neighborhood: string, cep: string, city: string, state: BrazilState, drawSender?: boolean): void;
    protected drawRecipientText(nameLine1: string, nameLine2: string | undefined, street: string, streetNumber: number, complement: string | undefined, neighborhood: string, cep: string, city: string, state: BrazilState): void;
    protected drawSenderText(nameLine1: string, nameLine2: string | undefined, street: string, streetNumber: number, complement: string | undefined, neighborhood: string, cep: string, city: string, state: BrazilState): void;
}
export default DrawLabel;
