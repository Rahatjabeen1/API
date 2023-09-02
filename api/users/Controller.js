require('dotenv').config()
const User = require('./Schema')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const { connect } = require('mongoose')

const SignUp = async (req, res) => {
  const { username, password, email } = req.body;
  try {
await connect(process.env.MONGO_URI)
// console.log("db connected")
const existingUser = await User.exists({ email: email })
        if (existingUser) {
            res.status(208).json({
                message: "User Already Exists"
            })
        }
        else {
            await User.create({ username, email, password: await hash(password, 12)})
            res.status(201).json({
                message: "done"
            })
        }
 
  } 
  catch (error) {
    res.json({
      message:"error"
     })
  }
  }

const login = async (req, res) => {
    const { password, email } = req.body;

    try {
      await connect(process.env.MONGO_URI)
      const existingUserCheck = await User.findOne({ email: email })

      if (!existingUserCheck) {
          res.status(404).json({
              message: "User not found"
          })
      }
      else{


        const decryptPassword = await compare(password, existingUserCheck.password)
          console.log(decryptPassword)
          if (email == existingUserCheck.email && decryptPassword) {
            const token = sign(
              {
                  id: existingUser._id,
                  username: existingUser.username,
                  email: existingUser.email,
                  
              }
              ,
              process.env.JWT_SECRET
              )
              res.status(200).json({
                  message : "success",
                  token: token
              })
              }
      else{
        res.json({
          message: "Invalid Credentials"
        })
      }
      }
    } 
    catch (error) {
      res.json(
        {
            message: error.message
        }
    )
    }
 }

 const allUsers = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI)
      const Users = await User.find()
      res.json(
          {
              Users: Users
          }
      )
  }
  catch (error) {
      res.json(
          {
              message: error.message
          }
      )
  }
}

const getUserbyEmail = async (req, res) => {

  const { email } = req.params
  try {
      await connect(process.env.MONGO_URI)
      const Users = await User.findOne({ email: email })
      res.json(
          {
              Users: Users
          }
      )
  }
  catch (error) {
      res.json(
          {
              message: error.message
          }
     )
  }
}


module.exports = {SignUp, login,allUsers,getUserbyEmail}