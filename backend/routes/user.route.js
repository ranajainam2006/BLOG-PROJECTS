const userController = require('../controllers/user.controller')
const router = require('express').Router()


const { verifyAuth } = require("../middleware/verify")
const { signUp, logIn, checkAuth, changePassword, sendOtp, updatePassword} = require('../controllers/user.controller')




router.post('/signUp', signUp)
router.post('/logIn', logIn)
router.get('/checkAuth', checkAuth)
router.get('/changePassword', changePassword)


router.post('/changePassword',  verifyAuth, changePassword)
router.post('/sendOtp', sendOtp)

router.post('/updatePassword', updatePassword)




module.exports = router;






