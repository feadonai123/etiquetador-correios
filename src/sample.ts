import fs from 'fs';
import { gerarBase64 } from '.';

const remetente = {
  address: {
    NomeLinha1: 'NomeLinha1',
    NomeLinha2: 'NomeLinha2',
    RuaComPrefixo: 'RuaComPrefixo',
    NumeroDaRua: 123,
    Complemento: 'Complemento',
    Bairro: 'Bairro',
    CEP: 'CEP',
    Cidade: 'Cidade',
    Estado: 'SP',
  },
};

const destinatario = {
  address: {
    NomeLinha1: 'NomeLinha1',
    NomeLinha2: 'NomeLinha2',
    RuaComPrefixo: 'RuaComPrefixo',
    NumeroDaRua: 123,
    Complemento: 'Complemento',
    Bairro: 'Bairro',
    CEP: 'CEP',
    Cidade: 'Cidade',
    Estado: 'SP',
  },
};

const base64 : string = gerarBase64(remetente, destinatario);
fs.writeFileSync('rotulo.pdf', base64, 'base64');
