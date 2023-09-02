const express = require('express')
const app = express()
require('dotenv').config()
// const mongoose = require('mongoose')

const port = process.env.SERVER_PORT

app.use(express.json())
app.use('/api', require('./api/users/Router'))
app.use('/api' , require('./api/products/Router' ))
app.use('/api' , require('./api/category/Router'))

// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("DB CONN"))
// .catch((err) => console.log("wrong"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})