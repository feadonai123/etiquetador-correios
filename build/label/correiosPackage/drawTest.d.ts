import DrawLabel from './drawStream';
import { sender, recipient } from '../pageTypes';
declare class DrawTest extends DrawLabel {
    private drawLabel;
    genBase64(sender1?: sender, recipient1?: recipient, sender2?: sender, recipient2?: recipient, sender3?: sender, recipient3?: recipient, sender4?: sender, recipient4?: recipient): string;
}
export default DrawTest;
