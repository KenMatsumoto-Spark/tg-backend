
import to from 'await-to-js'
import 'dotenv/config'
import Care from '../models/Care'
import mongoose from 'mongoose'
import User from '../models/User'
import Plant from '../models/Plant'

const listCaresByUser = async (userId: string) => {

  const [errorPlants, plants] = await to(Plant.find({ id_usuario: userId }))
  if(errorPlants) throw new Error("erro ao encontrar plantas")
  if(!plants) throw new Error("nenhuma planta encontrada")

  const plant_ids = plants.map((plant) => plant._id)
  const [errorCares, cares] = await to(Care.find({ planta_id: {$in: plant_ids} }))

  if(errorCares) throw new Error("erro ao encontrar cuidado")
  if(!cares) throw new Error("Cuidados não encontrado")
    
  return cares
}

export default listCaresByUser