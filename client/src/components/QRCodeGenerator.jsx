//Importa os estilos e as dependências
import { useState } from 'react';
import QRCode from 'qrcode.react';
import { Container, Title, Input, QRCodeContainer } from '../assets/styles/QRCodeGenerator-styling';

//Função do componente do gerador de QRcode
function QRCodeGenerator () {
  //Cria um estado para o texto a ser transformado
  const [text, setText] = useState('');

  //Retorna o componente de gerador de QRcode
  return (
    <Container>
      <Title>QR Code Generator</Title>
     
      <Input
        type="text"
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text to encode" 
      />
      {text && (
        <QRCodeContainer>
          <QRCode value={text} size={256} /> 
        </QRCodeContainer>
      )}
    </Container>
  );
};

//Exporta o componente QRCodeGenerator para o app
export default QRCodeGenerator;
