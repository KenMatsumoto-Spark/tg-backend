
import to from 'await-to-js'
import 'dotenv/config'
import Care from '../models/Care'
import mongoose from 'mongoose'

const showCare = async (plantId: string, careId: string) => {

  const [error, care] = await to(Care.findOne({ _id: new mongoose.Types.ObjectId(careId), planta_id: new mongoose.Types.ObjectId(plantId) }))

  if(error) throw new Error("erro ao encontrar cuidado")
  if(!care) throw new Error("Cuidado não encontrado")
    
  return care
}

export default showCare