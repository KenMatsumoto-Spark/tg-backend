
import to from 'await-to-js'
import User from '../models/User'
import Plant from '../models/Plant'
import mongoose from 'mongoose'

const addPlant = async (userId, plant, plant_access_token) => {
  
  const session = await mongoose.startSession()
  session.startTransaction()

  try{
    const newPlantId = new mongoose.Types.ObjectId()

    const [error, addedPlant] = await to(Plant.create({
      _id: newPlantId,
      id_usuario: userId,
      nome: plant.common_names[0],
      url_imagem: plant.image.value,
      codigo_acesso_planta: plant_access_token
    }, {
      options: { session }
    }))
  
    if(error) throw new Error()

      return addedPlant
  } catch(ex){
    throw ex
  }

  return true
}

export default addPlant