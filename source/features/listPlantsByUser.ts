
import to from 'await-to-js'
import axios from 'axios'
import 'dotenv/config'
import Plant from '../models/Plant'

const listPlantsByUser = async (userId) => {

  const [error, plants] = await to(Plant.find({ id_usuario: userId }))

  if(error) throw new Error(error.toString())

  return plants
}

export default listPlantsByUser