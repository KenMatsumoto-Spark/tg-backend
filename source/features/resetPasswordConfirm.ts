import bcrypt from 'bcrypt'
import User from '../models/User'
import to from 'await-to-js'

const resetPasswordConfirm = async (passwordConfirmation) => {

  const [error, user] = await to(User.findOne({
    passwordConfirmation
  }))

  if(error) throw new Error(error.toString())

  return user
}

export default resetPasswordConfirm