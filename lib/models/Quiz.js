const pool = require('../utils/pool');

module.exports = class Quiz {
  id;
  title;
  description;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
  }

  static async insert(quiz) {
    const { rows } = await pool.query(`
    INSERT INTO quizzes (title,
              description)
      VALUES ($1, $2)
      RETURNING *
    `,
    [quiz.title, quiz.description]
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
