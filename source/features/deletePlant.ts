
import to from 'await-to-js'
import 'dotenv/config'
import User from '../models/User'
import Plant from '../models/Plant'

const deletePlant = async (plantId, userId) => {

  const [error, deleteResult] = await to(Plant.deleteOne({
    id_usuario: userId,
    _id: plantId
  }))
  
  if(error) throw new Error("erro ao apagar planta")

  return true
}

export default deletePlant