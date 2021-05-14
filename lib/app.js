const express = require('express');
const Question = require('./models/Question');
const Quiz = require('./models/Quiz');
const app = express();

app.use(express.json());

app.post('/api/quizzes', async(req, res, next) => {
  try {
    const createdQuiz = await Quiz.insert(req.body);
    res.send(createdQuiz);
  }
  catch(error) {
    next(error);
  }
});

app.get('/api/quizzes', async(req, res, next) => {
  try {
    const response = await Quiz.getAllQuizzes();
    res.send(response);
  }
  catch(error) {
    next(error);
  }
});

app.get('/api/quizzes/:id', async(req, res, next) => {
  try {
    const response = await Quiz.getQuizById(req.params.id);
    res.send(response);
  }
  catch(error) {
    next(error);
  }
});

app.post('/api/questions', async(req, res, next) => {
  try {
    const createdQuestion = await Question.insertQuestion(req.body);
    res.send(createdQuestion);
  }
  catch(error) {
    next(error);
  }
});

app.get('/api/questions/:id', async(req, res, next) => {
  try {
    const questions = await Question.getQuestionsByQuizId(req.params.id);
    res.send(questions);
  }
  catch(error) {
    next(error);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

