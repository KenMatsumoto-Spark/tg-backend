
import to from 'await-to-js'
import 'dotenv/config'
import Care from '../models/Care'
import mongoose from 'mongoose'

const deleteCares = async (plantId, careId) => {
  const [error, deleteResult] = await to(Care.deleteOne({ _id: new mongoose.Types.ObjectId(careId), planta_id: new mongoose.Types.ObjectId(plantId) }))

  if(error) throw new Error("erro ao apagar lembrete")

  return true
}

export default deleteCares