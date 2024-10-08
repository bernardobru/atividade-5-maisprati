const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const PORT = 3000

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}))

const SECRET_KEY = "+Prati_2024";

const users = [
    {id: 1, username: 'admin', password: "12345"}
];

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({id: user.id, username: user.username}, SECRET_KEY, { expiresIn: '180s'});
        res.json({message: 'Login successful', token});
    }   else {
        res.status(401).json({message: 'Invalid username or password'});
    }
});


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.get('/check', authenticateToken, (req, res) => {
    res.json(true);
    
});

app.listen(PORT, () => {
    console.log(`Server running on http://Localhost:${PORT}`);
});

let tasks = []

const updateIps = () => {
    for (i of tasks) {
        i['id'] = tasks.indexOf(i)
    }
}

app.get('/tasks', (req, res) => {
    updateIps()
    res.json(tasks)
});

app.post('/tasks', (req, res) => {
    tasks.push(req.body)
    updateIps()
    res.json(req.body)
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id != taskId);
    if (tasks.length < initialLength) {
        updateIps()
        res.json({ message: 'Task deleted successfully!', tasks });
    } else {
        res.status(404).json({ message: 'Task not found!' });
    }
});

app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks[taskId].text = req.body.text
    res.json( { message: 'Task edited successfully!', tasks} )
});