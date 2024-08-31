//Importanto as dependências necessárias
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  useVerifyJWT  from "../assets/hooks/useVerifyJWT";
import { NavBar, NavBarToggle, StyledLink} from "../assets/styles/navbar";
import {
    FaQrcode,
    FaSearch,
    FaTasks,
    FaRegQuestionCircle,
    FaGlobeAmericas,
    FaNetworkWired,
    FaBars,
  } from "react-icons/fa";

//Função do componente de barra de navegação
function Navbar ({ logOut }) {
    //Cria um estado para verificar se a barra está aberta
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);

    //Cria uma instância da função de verificar o token
    const verifyJWT = useVerifyJWT();

    //Cria um hook de navegação
    const navigate = useNavigate()

    //Redireciona para a página
    const redirect = async (path) => {
      const tokenStatus = await verifyJWT();
      
      //Verifica se o token é verdadeiro, se não for, nao continua na página     
      if (tokenStatus !== true) {
       location.reload();
      } else {
        //Caso contrário, redireciona à página
        navigate(path); 
       }
    }
    
    //Alterna a visibilidade da barra de navegação.
    const toggleNavBar = () => {
        setIsNavBarOpen(!isNavBarOpen);
      };

    //Retorna o componente da barra de navegação  
    return(
        <>
        <NavBarToggle onClick={toggleNavBar}>
        <FaBars size={24} color="#2C3E50" />
      </NavBarToggle>
      <NavBar open={isNavBarOpen}>
        <StyledLink onClick={() => redirect('/qr-code-generator')}>
          <FaQrcode />
          QR Code Generator
        </StyledLink>
        <StyledLink onClick={() => redirect('/ip-address-finder')}>
          <FaNetworkWired />
          IP Address Finder
        </StyledLink>
        <StyledLink onClick={() => redirect('/movie-search-engine')}>
          <FaSearch />
          Movie Search
        </StyledLink>
        <StyledLink onClick={() => redirect('/to-do-app')}>
          <FaTasks />
          Todo App
        </StyledLink>
        <StyledLink onClick={() => redirect('/quiz-app')}>
          <FaRegQuestionCircle />
          Quiz App
        </StyledLink>
        <StyledLink onClick={() => redirect('/language-translator')}>
          <FaGlobeAmericas />
          Translator
        </StyledLink>
        <button
              onClick={logOut}
              style={{
                marginTop: "20px",
                color: "white",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              Logout
            </button>
      </NavBar>
      </>
    )
}

//Exporta o componente para o app
export default Navbar;