//Importa a biblioteca para requisições HTTP axios
import axios from 'axios';

//Função para criar um token JWT para autenticação e autorização de login
function useVerifyJWT () {
  //Função assíncrona para atualizar o token
  const updateToken = async () => {
    //Cria um token de autorização com cabeçalho de autorização utilizando um token do armazenamento de sessão do navegador
    const token = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    };
    //Tenta uma requisição 
    try {
      //Faz uma requisição GET para o "servidor" para verificar se o token é válido
      const response = await axios.get('http://localhost:3000/check', token);
      //Se tiver uma resposta, retorna verdadeiro
      if (response.data) {
        return true; 
      }
      //Pega o erro e faz um alerta de que o token expirou ou é invalido e retona o erro
    } catch (error) {
      alert('Token expired or invalid. Please Login again.');
      return error; 
    } 
  };
  //Retorna o token atualizado
  return updateToken; 
};

//Exporta o token
export default useVerifyJWT;