const Router = require("express");
const router = Router();
const { sendConsultancyMessage, getConsultancyChats } = require('../controllers/consultancyCntrl');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, sendConsultancyMessage);
router.route('/:userId').get(validateToken, getConsultancyChats);

module.exports = router;
