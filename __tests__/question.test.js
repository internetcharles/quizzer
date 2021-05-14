const fs = require('fs');
const pool = require('../lib/utils/pool');
const Question = require('../lib/models/Question');

describe('Quiz routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('Creates a new question via POST', async() => {
    const newQuestion = await Question.insertQuestion({
      questionText: 'What\'s your name?',
      correctAnswer: 'Charlie',
      incorrectAnswers: '[\'Nick\', \'James\', \'Paul\']',
      quizId: 1,
    });

    const { rows } = await pool.query(`
    SELECT * FROM questions WHERE quiz_id=$1`,
    [newQuestion.id]);

    expect(newQuestion).toEqual(new Question(rows[0]));
  });

  it('Gets all questions by quiz ID', async() => {
    const newQuestion = await Question.insertQuestion({
      questionText: 'What\'s your name?',
      correctAnswer: 'Charlie',
      incorrectAnswers: '[\'Nick\', \'James\', \'Paul\']',
      quizId: 1,
    });

    const foundQuestions = await Question.getQuestionsByQuizId(newQuestion.quizId);

    expect(foundQuestions).toEqual(expect.arrayContaining([
      newQuestion
    ]));
  });


});
