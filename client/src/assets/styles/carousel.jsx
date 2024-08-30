import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";


// Estiliza o contêiner do carrossel.
export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 70%;
  margin: auto;
  background-color: #2c3e50;
  border-radius: 20px;
  padding: 20px;
`;

// Estiliza o carrossel personalizado.
export const CustomCarousel = styled(Carousel)`
  width: 100%;
  .carousel-status {
    display: none;
  }
`;

// Estiliza os itens individuais do carrossel.
export const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  width: 100%;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: white;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 16px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;