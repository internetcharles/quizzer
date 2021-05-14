const pool = require('../utils/pool');

module.exports = class Quiz {
  id;
  title;
  description;
  questions;
  correctAnswers;
  incorrectAnswers;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.questions = row.questions;
    this.correctAnswers = row.correct_answers;
    this.incorrectAnswers = row.incorrect_answers;
  }

  static async insert(quiz) {
    const { rows } = await pool.query(`
    INSERT INTO quizzes (title,
              description,
              questions,
              correct_answers,
              incorrect_answers)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [quiz.title, quiz.description, quiz.questions, quiz.correctAnswers, quiz.incorrectAnswers]
    );

    return new Quiz(rows[0]);
  }

  static async getAllQuizzes() {
    const { rows } = await pool.query(
      'SELECT * FROM quizzes',
    );

    return rows.map(quiz => new Quiz(quiz));
  }

  static async getQuizById(quizId) {
    const { rows } = await pool.query(`
      SELECT * FROM quizzes
      WHERE id = $1
    `, [quizId]);

    if(!rows[0]) return null;
    else return new Quiz(rows[0]);
  }
};
