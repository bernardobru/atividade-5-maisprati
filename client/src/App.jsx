//Importa as dependências do projeto, assim como os componentes
import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  FaArrowLeft,
} from "react-icons/fa";
import QRCodeGenerator from "./components/QRCodeGenerator";
import IPAddressFinder from "./components/IPAddressFinder";
import MovieSearch from "./components/MovieSearch";
import ToDo from "./components/ToDo";
import Quiz from "./components/Quiz";
import Translator from "./components/Translator";
import Login from "./components/Login";
import Carousel from "./components/Carousel";
import Navbar from "./components/Navbar";
import { AppContainer, MainContent, Footer, ReturnButton } from "./assets/styles/App-styling";
import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

//Cria as rotas do site
const routes = {
  0: "/qr-code-generator",
  1: "/ip-address-finder",
  2: "/movie-search-engine",
  3: "/to-do-app",
  4: "/quiz-app",
  5: "/language-translator",
  6: "/"
}

//Cria a função do App
function App () {
  //Cria um estado para verificar se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  //Cria um estado para o índice do carrossel
  const [carouselIndex, setCarouselIndex] = useState(0);

  //Cria um hook de navegação, para nos permitir navegar pelo site
  const navigate = useNavigate(); // Hook para navegação.

  //Cria um efeito caso o usuário não esteja logado
  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.removeItem('token')
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  //Função que maneja o login sendo verdadeiro e navegando para a tela do multiapp 
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/qr-code-generator");
  };

  //Função que maneja o logout, setando o login sendo falso e navegando para a página de login
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('token')
    navigate("/");
  };

  //Função que maneja o retorno para a home
  const handleReturn = () => {
    return (
      navigate(routes['6'])

    );
  }

  //Cria um hook de localização para podermos utilizar os dados da localização atual do usuário no site
  const location = useLocation();

  //Cria um efeito para setar o índice do carrossel com base na localização do usuário no site
  useEffect(() => {
    for (let i in routes) {
      if (routes[i] === location.pathname && location.pathname != routes['6']) {
        setCarouselIndex(i)
      }
    }
  }, [location]);

  //Retorna o componente App
  return (
    <AppContainer>
      {!isAuthenticated ? (
        <MainContent>
          <Login onLogin={handleLogin} />
        </MainContent>
      ) : (
        <>
          <Navbar logOut={handleLogout} />
          <MainContent>
            <Routes>
              <Route path={routes['0']} element={
                <>
                  <QRCodeGenerator />
                  <ReturnButton onClick={handleReturn}>
                    <FaArrowLeft /> Return
                  </ReturnButton>
                </>
              } />
              <Route path={routes['1']} element={
                <>
                  <IPAddressFinder />
                  <ReturnButton onClick={handleReturn}>
                    <FaArrowLeft /> Return
                  </ReturnButton>
                </>
              } />
              <Route path={routes['2']} element={
                <>
                  <MovieSearch />
                  <ReturnButton onClick={handleReturn}>
                    <FaArrowLeft /> Return
                  </ReturnButton>
                </>
              } />
              <Route path={routes['3']} element={
                <>
                  <ToDo />
                  <ReturnButton onClick={handleReturn}>
                    <FaArrowLeft /> Return
                  </ReturnButton>
                </>
              } />
              <Route path={routes['4']} element={
                <>
                  <Quiz />
                  <ReturnButton onClick={handleReturn}>
                    <FaArrowLeft /> Return
                  </ReturnButton>
                </>
              } />
              <Route path={routes['5']} element={
                <>
                  <Translator />;
                  <ReturnButton onClick={handleReturn}>
                    <FaArrowLeft /> Return
                  </ReturnButton>
                </>
              } />
              <Route path={routes['6']} element={
                <>
                  <Carousel newIndex={carouselIndex} />;
                  <ReturnButton onClick={handleReturn}>
                    <FaArrowLeft /> Return
                  </ReturnButton>
                </>
              }>

              </Route>
            </Routes>
            <Footer>© 2024 Your Company | All rights reserved</Footer>
          </MainContent>
        </>
      )}
    </AppContainer>
  );
};

//Exporta o App para o main.jsx poder acessá-lo e renderizar no navegador
export default App;