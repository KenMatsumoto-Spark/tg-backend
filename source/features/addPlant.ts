
import to from 'await-to-js'
import User from '../models/User'
import Plant from '../models/Plant'
import mongoose from 'mongoose'

const addPlant = async (userId, plantId, customName) => {
  
  const session = await mongoose.startSession()
  session.startTransaction()

  try{
    const [error, addedPlant] = await to(Plant.create({
      userId,
      plantId,
      customName
    }, {
      options: { session }
    }))
  
    if(error) throw new Error()
  
    const [errorUser, updateResult] = await to(User.updateOne(userId, {
      myPlants: { $push: plantId },
    }, { options: { session } }))
  
    if(errorUser) throw new Error()
      
    if(updateResult.modifiedCount !== 1){
      throw new Error('numero de arquivos alterados diferente do esperado.')
    }

    await session.commitTransaction()
    session.endSession()

  } catch(ex){
    await session.abortTransaction()
    session.endSession()

    throw ex
  }

  return true
}

export default addPlant