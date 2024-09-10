import bcrypt from 'bcrypt'
import User from '../models/User'
import to from 'await-to-js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const signInUser = async (email, password) => {

  const jwtOptions: jwt.SignOptions = { algorithm: process.env.AUTH_ALGORITHM }

  const [error, user] = await to(User.findOne({
    email
  }))
  if(!user) throw new Error('usuário não encontrado')

  if(error) throw new Error(error)

  const [matchPassError, matchPass] = await to(bcrypt.compare(password, user?.password))
  if(matchPassError) throw new Error(matchPassError.message)

  const token = jwt.sign({
    name: user.name,
    _id: user._id,
    email: user.email,
    code: user.userCode,
    tokenType: 'authToken'
  }, process.env.AUTH_PRIVATE_KEY, jwtOptions)


  console.log({ token })
  
  return token
}

export default signInUser