import bcrypt from 'bcrypt'
import User from '../models/User'
import to from 'await-to-js'

const signInUser = async (email, password) => {

  const [error, user] = await to(User.findOne({
    email
  }))
  if(!user) throw new Error('usuário não encontrado')
  console.log({ user })
  if(error) throw new Error(error)

  const [matchPassError, matchPass] = await to(bcrypt.compare(password, user?.password))
  if(matchPassError) throw new Error('')
  console.log({ matchPassError, matchPass })

  return user
}

export default signInUser