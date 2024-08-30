//Importa as dependêncais necessárias e os estilos
import { useState } from 'react';
import { Container, Title, Question, OptionButton, Score } from '../assets/styles/QuizApp-styling'
import useVerifyJWT from '../assets/hooks/useVerifyJWT'; 

//Função do componente de quiz
function Quiz () {
  //Cria um estado para o placar e para as questões
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  //Cria uma instância para a função de verificar o token
  const verifyJWT = useVerifyJWT();
  
  //Cria um array com as questões
  const questions = [
    {
      question: "What is 2+2?", 
      options: ["3", "4", "5", "6"],
      answer: "4", 
    },
    {
      question: "What is 3+3?", 
      options: ["5", "6", "7", "8"], 
      answer: "6", 
    },
  ];

  //Função para manejar a resposta
  const handleAnswer = async (answer) => {

    //Verifica se o token é valido
    try {
      const tokenStatus = await verifyJWT() // Verifica o token
      if (tokenStatus !== true) {
        location.reload()
      }
    //Verifica se a resposta está correta.
    if (answer === questions[currentQuestion].answer) {
      //Se a resposta estiver correta, aumenta a pontuação em 1.
      setScore(score + 1);
    }
    //Passa para a próxima pergunta.
    setCurrentQuestion(currentQuestion + 1);
    } catch(error) {
      console.error(error)
    }
  };

  //Retorna o componente de quiz
  return (
    <Container>
      <Title>Quiz App</Title> 
      {currentQuestion < questions.length ? ( 
        <div>
          <Question>{questions[currentQuestion].question}</Question>
          {questions[currentQuestion].options.map((option) => (
            <OptionButton key={option} onClick={() => handleAnswer(option)}>{option}</OptionButton>
          ))}
        </div>
      ) : (
        <Score>Your score: {score}</Score>
      )}
    </Container>
  );
};

//Exporta o componente para o app
export default Quiz;
