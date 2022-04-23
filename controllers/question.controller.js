const questionService = require('../services/question.service');
const badRequests = require('../helpers/badRequests');
const CONSTANTS = require('../constants/');

class QuestionController {
  static async createQuestion(req, res, next) {
    try {
      const { body, uId } = req;
      const { title, payload } = body;

      const question = await questionService.createQuestion({ title, uId, payload });

      return res.status(200).json(question);
    } catch (e) {
      next(e);
    }
  }

  static async getAllQuestions(req, res, next) {
    try {
      const questions = await questionService.getAllQuestions();

      return res.status(200).json(questions);
    } catch (e) {
      next(e);
    }
  }

  static async getQuestion(req, res, next) {
    try {
      const { id } = req.params;

      if (!CONSTANTS.VALIDATION.OBJECT_ID.test(id)) {
        throw badRequests.InvalidValue({ value: id, param: 'id' });
      }

      const result = await questionService.getQuestion(id);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  static async addAnswer(req, res, next) {
    try {
      const { uId } = req;
      const { payload, question } = req.body;

      if (!question) {
        throw badRequests.NotEnParams({ name: 'question' });
      }

      if (!payload) {
        throw badRequests.InvalidValue({ message: 'Empty answers are not allowed' });
      }

      const result = await questionService.addAnswer(uId, payload, question);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  static async removeQuestion(req, res, next) {
    try {
      const { id } = req.params;

      await questionService.removeQuestion(id);

      res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = QuestionController;
