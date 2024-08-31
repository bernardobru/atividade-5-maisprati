//Importa as dependências e o estilo
import { useState } from 'react';
import axios from 'axios';
import { LoginContainer, LoginForm, Input, Button} from '../assets/styles/login'

//Função do componente de login
function Login ({ onLogin }) {
  //Cria um estado para o nome de usuário
  const [username, setUsername] = useState(''); 
  
  //Cria um estado para senha
  const [password, setPassword] = useState(''); 

  //Função assíncrona para manejar o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Tenta fazer uma requisição
    try {
      //Faz a requisição POST ao "servidor"
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password
      });

      //Se a resposta for bem sucedida, armazena o token no armazenamento de sessão e chama a função onLogin
      if (response.status === 200) {
        const { token } = response.data;
        console.log(response, response.data)
        sessionStorage.setItem('token', token); 
        onLogin(); 
      }
    } catch (error) {
      //Exibe um alerta se as credenciais estiverem incorretas
      alert(`Erro encontrado: ${error}`);
    }
  };

  //Retorna o componente de login
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="text"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="admin"
        />
        <Input
          type="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="12345" 
        />
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

//Exporta o componente de login para o app
export default Login; 
