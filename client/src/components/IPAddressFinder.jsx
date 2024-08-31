import { useState } from 'react'; // Importa o hook useState do React
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import useVerifyJWT from '../assets/hooks/useVerifyJWT'; // Hook para fazer validação do JWT
import { Container, Title, Input, Button, ResultsContainer} from '../assets/styles/IP_address_finder'

// Componente principal IPAddressFinder
function IPAddressFinder () {
  const [ip, setIp] = useState(''); // Define o estado para o IP digitado pelo usuário
  const [ipData, setIpData] = useState(null); // Define o estado para armazenar os dados do IP
  const verifyJWT = useVerifyJWT() // Recebe a função updateToken do hook
  // Função para buscar os dados do IP
  const findIP = async () => {
    const tokenStatus = await verifyJWT(); // Verifica o token

    if (tokenStatus !== true) {
      location.reload() // Se o token for inválido, não procede com a tradução
    } else {
      try {
        const url = `https://ipinfo.io/${ip}/json`
        const response = await axios.get(url); // Faz uma requisição GET para a API ipinfo.io
        setIpData(response.data); // Armazena os dados da resposta no estado ipData
      } catch (error) {
        console.error("Ocorreu um erro ao tentar buscar pelos dados :", error); // Exibe um erro no console em caso de falha
      }
    }
  };

  return (
    <Container>
      <Title>IP Address Finder</Title>
      <Input
        type="text"
        value={ip} // Valor do campo de entrada é ligado ao estado ip
        onChange={(e) => setIp(e.target.value)} // Atualiza o estado ip conforme o usuário digita
        placeholder="Enter IP address" // Placeholder do campo de entrada
      />
      <Button onClick={findIP}>Find IP</Button> {/* Botão que chama a função findIP quando clicado */}
      {ipData && ( // Condicional que exibe os dados do IP se ipData não for null
        <ResultsContainer>
          <p><strong>IP:</strong> {ipData.ip}</p>
          <p><strong>Location:</strong> {ipData.city}, {ipData.region}, {ipData.country}</p>
          <p><strong>ISP:</strong> {ipData.org}</p>
        </ResultsContainer>
      )}
    </Container>
  );
}
 
export default IPAddressFinder; // Exporta o componente IPAddressFinder como padrão