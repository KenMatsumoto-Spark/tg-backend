
import to from 'await-to-js'
import axios from 'axios'
import 'dotenv/config'
import Care from '../models/Care'
import mongoose from 'mongoose'

const showPlantCare = async (plantId) => {

  const [error, cares] = await to(Care.findOne({ planta_id: new mongoose.Types.ObjectId(plantId) }))

  if(error) throw new Error("erro ao encontrar planta do usuario")

  return cares
}

export default showPlantCare