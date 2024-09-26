
import to from 'await-to-js'
import 'dotenv/config'
import Care from '../models/Care'
import mongoose from 'mongoose'
import ActivityType from '../models/ActivityType'

const editCare = async (plantId, careId, care) => {

  const [ errorAtividade, activityType ] = await to(ActivityType.findOne({ descricao: care?. tipo_Atividade }))

  if(errorAtividade) throw new Error("Erro ao encontrar tipo de atividade")

  if(!activityType) throw new Error("Tipo de atividade não encontrado")

  const [error, updateResult] = await to(Care.updateOne({ _id: new mongoose.Types.ObjectId(careId), planta_id: new mongoose.Types.ObjectId(plantId) }, {
    tipo_atividade_id: activityType._id,
    ...care
  }))

  if(error) throw new Error("erro ao atualizar cuidado")

    if(updateResult.modifiedCount !== 1){
      throw new Error('numero de arquivos alterados diferente do esperado.')
    }

  return true
}

export default editCare