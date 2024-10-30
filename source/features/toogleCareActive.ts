
import to from 'await-to-js'
import mongoose from 'mongoose'
import Care from '../models/Care'

const toogleCareActive = async (careId) => {

  try{
    const [error, updateResult] = await to(Care.updateOne({
      _id: new mongoose.Types.ObjectId(careId)
    },[ { "$set": { "ativa": { "$eq": [false, "$ativa"] } } } ] ))
  
    if(error) throw new Error()
  
    return
  } catch(ex){
    throw ex
  }
}

export default toogleCareActive