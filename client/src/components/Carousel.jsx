//Importa as dependências necessárias para o carrossel
import { useNavigate } from "react-router-dom"; 
import { CarouselContainer, CustomCarousel, CarouselItem } from "../assets/styles/carousel";
import useVerifyJWT from "../assets/hooks/useVerifyJWT"; 

//Função do componente do carrossel
function Carousel ({ newIndex }) {
  //Cria uma instância da função de atualizar o token
  const verifyJWT = useVerifyJWT(); 
  //Cria um hook de navegação, para nos permitir navegar pelo site
  const navigate = useNavigate();

  //Função que redirecionará para a página caso o token seja verdadeiro
  const redirect = async (path) => {
    //Verifica o token
    const tokenStatus = await verifyJWT(); 

    //Se o token for falso, a tradução não acontecerá
    if (tokenStatus !== true) {
       location.reload();
      } else {
        //Caso contrário, redirecionará para a página desejada
        navigate(path);
      }
  }

  //Retorna o componente
  return (
    <CarouselContainer>
      <CustomCarousel
        showArrows={true}
        showThumbs={false}
        showIndicators={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        selectedItem={newIndex}
      >
        <CarouselItem>
          <h2>QR Code Generator</h2>
          <button onClick={() => redirect('/qr-code-generator')}>
            Acessar
          </button>
        </CarouselItem>
        <CarouselItem>
          <h2>IP Address Finder</h2>
          <button onClick={() => redirect('/ip-address-finder')}>
            Acessar
          </button>
        </CarouselItem>
        <CarouselItem>
          <h2>Movie Search Engine</h2>
          <button onClick={() => redirect('/movie-search-engine')}>
            Acessar
          </button>
        </CarouselItem>
        <CarouselItem>
          <h2>Todo App</h2>
          <button onClick={() => redirect('/to-do-app')}>
            Acessar
          </button>
        </CarouselItem>
        <CarouselItem>
        <h2>Quiz App</h2>
        <button onClick={() => redirect('/quiz-app')}>
            Acessar
          </button>
        </CarouselItem>
        <CarouselItem>
          <h2>Language Translator</h2>
          <button onClick={() => redirect('/language-translator')}>
            Acessar
          </button>
        </CarouselItem>
      </CustomCarousel>
    </CarouselContainer>
  )
}
 
//Exporta o componente para ser usado em App.jsx
export default Carousel;