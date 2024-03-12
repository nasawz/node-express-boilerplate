const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const aiController = require('../../controllers/ai.controller');

const router = express.Router();

router.route('/completions').post(auth(), aiController.createMessage);

module.exports = router;
