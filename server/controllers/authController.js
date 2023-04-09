const errorHandler = require('../middlewares/errorMiddleware')
const userModel = require('../models/userModel')
const errorResponse = require('../utils/errorResponse')

// JWT token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res)
  res.status(statusCode).json({
    success: true,
    token,
  })
}

// register
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    // existing user
    const existingEmail = await userModel.findOne({ email })
    if (existingEmail) {
      return next(new errorResponse('Email is already register', 500))
    }
    const user = await userModel.create({ username, email, password })
    sendToken(user, 201, res)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// login
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // validation
    if (!email || !password) {
      return next(new errorResponse('Please provide email or password'))
    }
    const user = await userModel.findOne({ email })
    if (!user) {
      return next(new errorResponse('Invlid credential', 401))
    }
    const isMatch = await userModel.matchPassword(password)
    if (!isMatch) {
      return next(new errorHandler('Invlid credential', 401))
    }
    // Res
    sendToken(user, 200, res)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// logout
exports.logoutController = async (req, res, next) => {
  res.clearCookie('refreshToken')
  return res.status(200).json({
    success: true,
    message: 'Logout Successfully',
  })
}
