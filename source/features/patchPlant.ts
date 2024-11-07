import to from 'await-to-js'
import Plant from '../models/Plant'
import mongoose from 'mongoose'

const patchPlant = async (plantId, plantName) => {
  
  try{
    const [error, updateResult] = await to(Plant.updateOne({
      _id: new mongoose.Types.ObjectId(plantId)
    },
  {
    nome: plantName
  }))
  
    if(error) throw new Error('rerro ao editar planta')

    return true
  } catch(ex){
    throw ex
  }

}

export default patchPlant