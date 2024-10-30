
import to from 'await-to-js'
import mongoose from 'mongoose'
import Care from '../models/Care'
import ActivityType from '../models/ActivityType'

const addCareToPlant = async (userId, plantId, care) => {

  try{
    const [ errorAtividade, activityType ] = await to(ActivityType.findOne({ descricao: care?.atividade }))

    if(errorAtividade) throw new Error("Erro ao encontrar tipo de atividade")

    if(!activityType) throw new Error("Tipo de atividade não encontrado")

    const [error, cuidado] = await to(Care.create({
      planta_id: plantId,
      tipo_atividade_id: activityType._id,
      ...care 
    }))
  
    if(error) throw new Error()
  
    return
  } catch(ex){
    throw ex
  }
}

export default addCareToPlant