/* eslint-disable no-console */
import DrawTest from './label/correiosPackage/drawTest';
import { sender, recipient } from './label/pageTypes';

export const gerarBase64 = (
  RemetenteObj: sender,
  DestinatarioObj: recipient,
) : string => {
  // Cria um PDF
  const pdfCreateFileWithStream = new DrawTest();
  // Roda o teste de desenhar a label
  const base64 = pdfCreateFileWithStream.genBase64(RemetenteObj, DestinatarioObj);
  return base64;
};
