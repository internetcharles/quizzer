const pool = require('../utils/pool');

module.exports = class Question {
  id;
  questionText;
  correctAnswer;
  incorrectAnswers;
  quizId;


  constructor(row) {
    this.id = row.id;
    this.questionText = row.question_text;
    this.correctAnswer = row.correct_answer;
    this.incorrectAnswers = row.incorrect_answers;
    this.quizId = row.quiz_id;
  }

  static async insertQuestion(question) {
    const { rows } = await pool.query(`
    
    INSERT INTO questions(question_text,
      correct_answer,
      incorrect_answers,
      quiz_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
    [question.questionText, question.correctAnswer, question.incorrectAnswers, question.quizId]);
    return new Question(rows[0]);
  }

  static async getQuestionsByQuizId(quizId) {
    const { rows } = await pool.query(
      'SELECT * FROM questions WHERE quiz_id=$1',
      [quizId]);
    return rows.map(question => new Question(question));
  }
};
