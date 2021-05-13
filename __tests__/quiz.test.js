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
      description: 'A geography quiz'
    });

    const { rows } = await pool.query(`
    SELECT * FROM quizzes WHERE id=$1`,
    [newQuiz.id]);

    expect(newQuiz).toEqual(new Quiz(rows[0]));
  });

});
