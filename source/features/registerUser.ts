import bcrypt from 'bcrypt'
import User from '../models/User'
import to from 'await-to-js'

const registerUser = async (userName, email, password) => {

  const encryptedPass = await bcrypt.hash(password, 14)

  const [error, user] = await to(User.create({
    userName,
    email,
    password: encryptedPass
  }))

  if(error) throw new Error(error.toString())

  return user
}

export default registerUser