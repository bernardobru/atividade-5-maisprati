//Importa as dependências e os estilos
import { useState } from 'react'; 
import axios from 'axios'; 
import useVerifyJWT from '../assets/hooks/useVerifyJWT'; 
import { Container, Title, Label, Select, Input, Button, TranslatedText} from "../assets/styles/LanguageTranslator-styling";

//Função do componente tradutor
function Translator () {
  const verifyJWT = useVerifyJWT(); // Recebe a função updateToken do hook
  const [text, setText] = useState(''); // Armazena o texto do prompt
  const [translatedText, setTranslatedText] = useState(''); // Armazena o texto traduzido da API
  const [sourceLang, setSourceLang] = useState('en'); // Idioma de entrada
  const [targetLang, setTargetLang] = useState('es'); // Idioma de saída

  //Função para trauzir o texto
  const translateLanguage = async () => {
    const tokenStatus = await verifyJWT(); // Verifica o token

    if (tokenStatus !== true) { location.reload() } // Se o token for inválido, não procede com a tradução

    try { // Tenta fazer a requisição para a API
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: text,
          langpair: `${sourceLang}|${targetLang}`,
        },
      });

      if (response.data.matches === "") { // Verifica a ausência de texto no prompt
        setTranslatedText('*No text inserted*');
      } else {
        setTranslatedText(response.data.responseData.translatedText); // Mostra o texto traduzido na tela
      }
    } catch (error) {
      console.error("Error translating text:", error); // Mostra o erro da API no console
      alert("Error translating text:", error); // Mostra o erro da API na tela
    }
  };


  //Conteúdo principal da página
  return (
    <Container>
      <Title>Language Translator</Title> {/*Título do componente*/}
      <div>
        {/*Selecionar idioma de entrada*/}
        <Label>Source Language:</Label>
        <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </Select>
      </div>
      <div>
        {/*Selecionar idioma de saída*/}
        <Label>Target Language:</Label>
        <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </Select>
      </div>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text to translate" 
      />
      <Button onClick={translateLanguage}>Translate</Button>
      {translatedText && <TranslatedText>{translatedText}</TranslatedText>} 
    </Container>
  );
};


//Exporta o componente Tradutor para o app
export default Translator;
