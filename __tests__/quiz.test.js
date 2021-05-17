const fs = require('fs');
const pool = require('../lib/utils/pool');
const Quiz = require('../lib/models/Quiz');

describe('Quiz routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('Creates a new quiz via POST', async() => {
    const newQuiz = await Quiz.insert({
      title: 'Geography',
      description: 'A geography quiz',
      questions: 'Where am I?',
      correctAnswers: 'Here',
      incorrectAnswer1: 'There',
      incorrectAnswer2: 'Where',
      incorrectAnswer3: 'Cool'
    });

    const { rows } = await pool.query(`
    SELECT * FROM quizzes WHERE id=$1`,
    [newQuiz.id]);

    expect(newQuiz).toEqual(new Quiz(rows[0]));
  });

  it('Finds all quizzes', async() => {
    const newQuiz = await Quiz.insert({
      title: 'Geography',
      description: 'A geography quiz',
      questions: 'Where am I?',
      correctAnswers: 'Here',
      incorrectAnswer1: 'There',
      incorrectAnswer2: 'Where',
      incorrectAnswer3: 'Cool'
    });

    const foundQuiz = await Quiz.getAllQuizzes();

    expect(newQuiz).toEqual(foundQuiz[0]);
  });

  it('Finds quiz by id', async() => {
    const newQuiz = await Quiz.insert({
      title: 'Geography',
      description: 'A geography quiz',
      questions: 'Where am I?',
      correctAnswers: 'Here',
      incorrectAnswer1: 'There',
      incorrectAnswer2: 'Where',
      incorrectAnswer3: 'Cool'
    });

    const foundQuiz = await Quiz.getQuizById(newQuiz.id);

    expect(foundQuiz).toEqual(newQuiz);
  });

  it('Deletes quiz', async() => {
    const newQuiz = await Quiz.insert({
      title: 'Geography',
      description: 'A geography quiz',
      questions: 'Where am I?',
      correctAnswers: 'Here',
      incorrectAnswer1: 'There',
      incorrectAnswer2: 'Where',
      incorrectAnswer3: 'Cool'
    });

    const deletedQuiz = await Quiz.deleteQuiz(newQuiz.id);

    expect(deletedQuiz).toEqual(newQuiz);
  })
});
