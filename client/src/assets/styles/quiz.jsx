import styled from "styled-components";

//Estiliza o container da página de quiz
export const Container = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff; 
  border-radius: 15px; 
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 500px; 
  margin: 50px auto;
`;

//Estiliza o título
export const Title = styled.h2`
  color: #333;
  margin-bottom: 20px; 
  font-size: 24px;
  text-align: center;
`;

//Estiliza o parágrafo da pergunta
export const Question = styled.p`
  color: #555; 
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

//Estiliza os botões de opção
export const OptionButton = styled.button`
  padding: 12px 20px;
  background-color: #007bff;  
  color: white;  
  border: none;
  border-radius:
  cursor: pointer;
  font-size: 16px; 
  margin: 10px;  
  transition: background-color 0.3s, transform 0.3s;  

  &:hover { 
    background-color: #0056b3;
    transform: scale(1.05); 
  }

  &:active { 
    background-color: #004494;
    transform: scale(0.95); 
  }
`;

//Estiliza o parágrafo com o placar
export const Score = styled.p`
  color: #333;
  font-size: 20px; 
  margin-top: 20px; 
  text-align: center; 
`;
