//Importa as dependências necessárias o os estilos
import { useState } from 'react'; 
import axios from 'axios'; 
import { Container, Title, Input, Button, MoviesContainer, MovieCard } from '../assets/styles/movie_search'
import useVerifyJWT from "../assets/hooks/useVerifyJWT";

//Função do componente de pesquisa de filmes
function MovieSearch () {
  //Cria um estado para a busca
  const [query, setQuery] = useState(''); // Define o estado para a consulta de busca
  
  //Cria um estado para os filmes
  const [movies, setMovies] = useState([]); // Define o estado para armazenar os filmes
  
  //Cria uma instância da função de verificar o token
  const verifyJWT = useVerifyJWT();  
  
  //Função que fará a requisição à api
  const searchMovies = async () => {
    //Verifica se o token for válido
    const tokenStatus = await verifyJWT();
    
    //Se o token não for válido, não acessa a página
    if (tokenStatus !== true) {
      location.reload()
     } else {
      //Tenta fazer uma requisição
      try {
        //Faz uma requisição à api do omdb
        const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=403abbfe`); 
        //Seta a resposta da api como os filmes
        setMovies(response.data.Search);
      } catch (error) {
        //Exibe o erro no console
        console.error("Error fetching movie data:", error);
      }   
     }
  };

  //Retona o componente de busca de filmes
  return (
    <Container>
      <Title>Movie Search Engine</Title>
      <Input
        type="text"
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie" 
      />
      <Button onClick={searchMovies}>Search</Button>
      <MoviesContainer>
        {movies && movies.map((movie) => ( 
          <MovieCard key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} /> 
            <h3>{movie.Title}</h3> 
            <p>{movie.Year}</p> 
          </MovieCard>
        ))}
      </MoviesContainer>
    </Container>
  );
};

//Exporta o componente para o app
export default MovieSearch; 