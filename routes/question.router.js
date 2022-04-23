const express = require('express');

const router = express.Router();

const Question = require('../controllers/question.controller');

const Middlewares = require('../middlewares/index');

router.get('/', Question.getAllQuestions);

router.get('/:id', Question.getQuestion);

router.use(Middlewares.authorization);

router.post('/answer', Question.addAnswer);

router.post('/', Question.createQuestion);

router.delete('/:id', Middlewares.adminAccess, Question.removeQuestion);

module.exports = router;
