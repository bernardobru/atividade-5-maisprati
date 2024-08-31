//Importa as dependências necessárias e os estilos
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Title, Input, Button, TaskList, TaskItem, EditInput } from '../assets/styles/to_do'
import useVerifyJWT from "../assets/hooks/useVerifyJWT";
const API_URL = 'http://localhost:3000/tasks';


//Função do componente ToDo
function ToDo () {
  //Cria um estado para uma tarefa, para armazenar as tarefas e para editar o id e o texto das tarefas 
  const [task, setTask] = useState(''); 
  const [tasks, setTasks] = useState([]); 
  const [editingTaskId, setEditingTaskId] = useState(null); 
  const [editingTaskText, setEditingTaskText] = useState(''); 

  //Cria uma instância da função de verificar o token
  const verifyJWT = useVerifyJWT() 
  
  //Cria um efeito para buscar as tarefas
  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  //Função que busca as tarefas da API e atualiza o estado com as tarefas recebidas.
  const fetchTasks = async () => {
    //Faz uma requisição GET para obter as tarefas
    const response = await axios.get(API_URL); 
    if (JSON.stringify(response.data) != JSON.stringify(tasks)) {
      // Atualiza o estado com os dados recebidos.
      setTasks(response.data); 
    }
  };

  //Função que adiciona uma nova tarefa.
  const addTask = async () => {
    try {
      //Se a tarefa for verdadeira
      if (task) {
        // Verifica o token
        const tokenStatus = await verifyJWT() 
        if (tokenStatus == true) {
          const newTask = { text: task };

          // Espera a resposta da adição da nova tarefa.
          const response = await axios.post(API_URL, newTask);

          // Atualiza o estado localmente com a nova tarefa.
          setTasks(prevTasks => [...prevTasks, response.data]);

          // Limpa o campo de entrada.
          setTask('');
        } else {
          location.reload()
        }
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };


  //Função que exclui uma tarefa.
  const deleteTask = async (id) => {
    try {
      const tokenStatus = await verifyJWT()
      if (tokenStatus == true) {
        //Faz uma requisição DELETE para excluir a tarefa com o id fornecido.
        await axios.delete(`${API_URL}/${id}`); 
        //Atualiza o estado removendo a tarefa excluída.
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); 
      } else {
        location.reload()
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  //Função que inicia o processo de edição de uma tarefa.
  const editTask = (id, text) => {
    //Define o id da tarefa que está sendo editada.
    setEditingTaskId(id); 

    //Define o texto da tarefa que está sendo editada.
    setEditingTaskText(text);
  };

  //Função que atualiza uma tarefa existente.
  const updateTask = async (id) => {
    try {
      //Verifica o token
      const tokenStatus = await verifyJWT()
      if (tokenStatus == true) {
        //Cria um objeto de tarefa com o texto atualizado.
        const updatedTask = { text: editingTaskText }; 

        //Faz uma requisição PUT para atualizar a tarefa.
        await axios.put(`${API_URL}/${id}`, updatedTask); 

        //Atualiza o estado com a tarefa modificada.
        setTasks(tasks.map(task => (task.id === id ? { ...task, text: editingTaskText } : task))); 
        
        // Limpa o id da tarefa em edição.
        setEditingTaskId(null); 
        
         // Limpa o texto da tarefa em edição.
        setEditingTaskText('');
      } else {
        location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  };

  //Retorna o componente do to do list
  return (
    <Container>
      <Title>Todo App</Title> 
      <Input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <Button onClick={() => { addTask() }}>Add Task</Button>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            {editingTaskId === task.id ? (
              <EditInput
                type="text"
                value={editingTaskText}
                onChange={(e) => setEditingTaskText(e.target.value)}
                onBlur={() => updateTask(task.id)}
              />
            ) : (
              <>
                {task.text}
                <div>
                  <button onClick={() => editTask(task.id, task.text)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};

//Exporta o componente ToDo para o app
export default ToDo;