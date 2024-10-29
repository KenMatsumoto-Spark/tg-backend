
import to from 'await-to-js'
import 'dotenv/config'
import User from '../models/User'

const deleteUser = async (userId, email) => {

  const [error, user] = await to(User.findOne({
    email
  }))

  if(error) throw new Error("erro ao atualizar cuidado.")
  if(!user) throw new Error("usuario associado a este email não encontrado.")

  if(userId !== user?._id){
    throw new Error("usuario Logado não coincide com o email informado.")
  }

  await to(User.deleteOne({ _id: userId }))

  return true
}

export default deleteUser