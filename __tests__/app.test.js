const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Quiz = require('../lib/models/Quiz');

describe('quizzer-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('makes a new quiz on POST', async() => {
    const response = await request(app)
      .post('/api/quizzes')
      .send({
        title: 'Geography',
        description: 'A geography quiz',
        questions: 'Where am I?',
        correctAnswers: 'Here',
        incorrectAnswer1: 'There',
        incorrectAnswer2: 'Where',
        incorrectAnswer3: 'Cool'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      title: 'Geography',
      description: 'A geography quiz',
      questions: 'Where am I?',
      correctAnswers: 'Here',
      incorrectAnswer1: 'There',
      incorrectAnswer2: 'Where',
      incorrectAnswer3: 'Cool'
    });
  });

  it('gets all quizzes', async() => {
    await request(app)
      .post('/api/quizzes')
      .send({
        title: 'Geography',
        description: 'A geography quiz',
        questions: 'Where am I?',
        correctAnswers: 'Here',
        incorrectAnswer1: 'There',
        incorrectAnswer2: 'Where',
        incorrectAnswer3: 'Cool'
      });

    const response = await request(app)
      .get('/api/quizzes');

    expect(response.body).toEqual(expect.arrayContaining([{
      id: expect.any(String),
      title: 'Geography',
      description: 'A geography quiz',
      questions: 'Where am I?',
      correctAnswers: 'Here',
      incorrectAnswer1: 'There',
      incorrectAnswer2: 'Where',
      incorrectAnswer3: 'Cool'
    }]));
  });

  it('gets quiz by id', async() => {
    const newQuiz = await Quiz.insert({
      title: 'Geography',
      description: 'A geography quiz',
      questions: 'Where am I?',
      correctAnswers: 'Here',
      incorrectAnswer1: 'There',
      incorrectAnswer2: 'Where',
      incorrectAnswer3: 'Cool'
    });


    const response = await request(app)
      .get(`/api/quizzes/${newQuiz.id}`);

    expect(response.body).toEqual({
      id: expect.any(String),
      title: 'Geography',
      description: 'A geography quiz',
      questions: 'Where am I?',
      correctAnswers: 'Here',
      incorrectAnswer1: 'There',
      incorrectAnswer2: 'Where',
      incorrectAnswer3: 'Cool'
    });
  });

  it('deletes quiz on DELETE', async() => {
    const newQuiz = await Quiz.insert({
      title: 'Geography',
      description: 'A geography quiz',
      questions: 'Where am I?',
      correctAnswers: 'Here',
      incorrectAnswer1: 'There',
      incorrectAnswer2: 'Where',
      incorrectAnswer3: 'Cool'
    });

    const response = await request(app)
      .delete(`/api/quizzes/${newQuiz.id}`);

    expect(response.body).toEqual({
      id: expect.any(String),
      title: 'Geography',
      description: 'A geography quiz',
      questions: 'Where am I?',
      correctAnswers: 'Here',
      incorrectAnswer1: 'There',
      incorrectAnswer2: 'Where',
      incorrectAnswer3: 'Cool'
    });
  });
});
