const express = require('express')
const router = express.Router()

const {getAllProducts,addProduct} = require('./Controller')
//getallproducts
router.get('/products', getAllProducts)



//addproduct
router.post('/addproduct' , addProduct)

module.exports = router