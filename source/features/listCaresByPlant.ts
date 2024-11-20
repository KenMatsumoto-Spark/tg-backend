
import to from 'await-to-js'
import 'dotenv/config'
import Care from '../models/Care'
import mongoose from 'mongoose'

const listCaresByPlant = async (plantId: string) => {

  const [errorCares, cares] = await to(Care.find({ planta_id: new mongoose.Types.ObjectId(plantId) }))

  if (errorCares) throw new Error("erro ao encontrar cuidado")
  if (!cares) throw new Error("Cuidados não encontrado")

  return cares
}

export default listCaresByPlant