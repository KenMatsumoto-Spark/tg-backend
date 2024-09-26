import bcrypt from 'bcrypt'
import User from '../models/User'
import to from 'await-to-js'

const resetPasswordChange = async (password, passwordConfirmation, passwordResetCode) => {

  if(password !== passwordConfirmation) throw new Error('Senhas não coincidem')

  const encryptedPass = await bcrypt.hash(password, 14)

  const [error, user] = await to(User.updateOne({
    codigoRedefinicaoSenha: passwordResetCode
  },
    {
    senha: encryptedPass,
    codigoRedefinicaoSenha: "codigoDeRedefiniçãoDesativado"
  }))

  if(error) throw new Error(error.toString())

  return user
}

export default resetPasswordChange