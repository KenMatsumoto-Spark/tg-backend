
import to from 'await-to-js'
import 'dotenv/config'
import User from '../models/User'

const deleteUser = async (userId, name, avatar) => {

  const newParams = {}
  if(name) newParams['nome'] = name
  if(avatar) newParams['avatar'] = avatar

  const [error, updatedResult] = await to(User.updateOne({
    userId
  }, newParams))

  if(error) throw new Error("erro ao atualizar cuidado.")

  return true
}

export default deleteUser