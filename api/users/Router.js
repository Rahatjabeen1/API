const express = require('express')
const router = express.Router()

const {SignUp,login,allUsers,getUserbyEmail} = require('./Controller')

router.post('/signup', SignUp)
router.post('/login',login )
router.get('/getallusers', allUsers)
router.get('/userbyemail/:email', getUserbyEmail)

module.exports = router