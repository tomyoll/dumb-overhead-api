const questionProvider = require('../providers/question.provider');
const answerProvider = require('../providers/answer.provider');
const userProvider = require('../providers/user.provider');
const badRequests = require('../helpers/badRequests');

class QuestionService {
  async createQuestion({ title, uId, payload }) {
    const { userName } = await userProvider.getSingleById(uId, { userName: 1 });

    const author = {
      id: uId,
      userName,
    };

    const question = await questionProvider.createSingle({ title, author, payload });

    return question;
  }

  async getAllQuestions() {
    const questions = await questionProvider.getMany({}, {}, { sort: { createdAt: -1 } });

    return questions;
  }

  async getQuestion(id) {
    let question = await questionProvider.getSingleById(id);
    const answers = await answerProvider.getMany({ question: id }, {}, { sort: { date: -1 } });

    if (!question) {
      question = {};
    }

    return { question, answers };
  }

  async addAnswer(authorId, payload, question) {
    const checkExist = await questionProvider.getSingleById(question, { _id: 1 });

    if (!checkExist) {
      throw badRequests.NotFound({ message: 'question not found' });
    }

    const author = await userProvider.getSingleById(authorId, { _id: 1, userName: 1 });

    const answerObj = {
      author,
      question: checkExist._id,
      payload,
    };

    const result = await answerProvider.createSingle(answerObj);

    await questionProvider.updateSingleById(checkExist._id, { $push: { answers: result._id } });

    return result;
  }

  async removeQuestion(questionId) {
    console.log(questionId)
    console.log(await answerProvider.getMany({ question: questionId }));
    console.log(await questionProvider.getSingleById(questionId))
    await Promise.all([
      answerProvider.deleteMany({ question: questionId }),
      questionProvider.deleteSingleById(questionId),
    ]);
  }
}

module.exports = new QuestionService();
