const express = require('express')
const router = express.Router()

const {getAllCategories,getCategorybyId,DeleteCategory,updateCategory,addCategory} = require('./Controller')

router.get('/getallcategories',getAllCategories)
router.get('/getcategorybyid', getCategorybyId) //params
router.delete('/delete-category', DeleteCategory)
router.put('/update-category', updateCategory)
router.post('/add-category', addCategory)

module.exports = router