import bcrypt from 'bcrypt'
import User from '../models/User'
import to from 'await-to-js'

const resetPasswordChangeLoggedUser = async (oldPassword, password, passwordConfirmation, userId) => {

  if (password !== passwordConfirmation) throw new Error('Senhas não coincidem')

  const encryptedPass = await bcrypt.hash(password, 14)

  const [error2, user] = await to(User.findOne({
    _id: userId
  }))

  const [matchPassError, matchPass] = await to(bcrypt.compare(oldPassword, user?.senha))
  if (!matchPass) throw new Error('senha não coincide com o usuario')

  const [error, updatedUser] = await to(User.updateOne({
    _id: userId
  },
    {
      senha: encryptedPass,
    }))

  if (error) throw new Error(error.toString())

  return updatedUser
}

export default resetPasswordChangeLoggedUser