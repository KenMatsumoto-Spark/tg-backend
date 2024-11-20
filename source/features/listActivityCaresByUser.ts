
import to from 'await-to-js'
import 'dotenv/config'
import Care from '../models/Care'
import mongoose from 'mongoose'
import User from '../models/User'
import Plant from '../models/Plant'
import ActivityCare from '../models/ActivityCare'

const listActivityCaresByUser = async (userId: string, plantId: string) => {

  // const [errorPlants, plants] = await to(Plant.find({ id_usuario: userId }))
  // if (errorPlants) throw new Error("erro ao encontrar plantas")
  // if (!plants) throw new Error("nenhuma planta encontrada")

  // const plant_ids = plants.map((plant) => plant._id)
  const [errorCares, cares] = await to(Care.find({ planta_id: new mongoose.Types.ObjectId(plantId) }))
  if (errorCares) throw new Error("erro ao encontrar cuidados")
  if (!cares) throw new Error("nenhum cuidado encontrado")

  const care_ids = cares.map((care) => care._id)
  const [errorActivityCares, cuidado_de_adividades] = await to(ActivityCare.find({ cuidado_id: { $in: care_ids } }))
  if (errorActivityCares) throw new Error("erro ao encontrar atividade de cuidados")
  if (!cuidado_de_adividades) throw new Error("nenhum cuidado de atividade encontrado")

  return cuidado_de_adividades
}

export default listActivityCaresByUser