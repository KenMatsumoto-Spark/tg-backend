
import to from 'await-to-js'
import mongoose from 'mongoose'
import Care from '../models/Care'
import ActivityType from '../models/ActivityType'

const addCareToPlant = async (userId, plantId, care) => {
  
  const session = await mongoose.startSession()
  session.startTransaction()

  try{  

    const dayWeek = [
      { id: '1', dia: 'Seg' },
      { id: '2', dia: 'ter' },
      { id: '3', dia: 'Qua' },
      { id: '4', dia: 'Qui' },
      { id: '5', dia: 'Sex' },
      { id: '6', dia: 'Sab' },
      { id: '7', dia: 'Dom' }
    ]


    const [ errorAtividade, activityType ] = await to(ActivityType.findOne({ descricao: care?.tipo_Atividade }))

    if(errorAtividade) throw new Error("Erro ao encontrar tipo de atividade")

    if(!activityType) throw new Error("Tipo de atividade não encontrado")

    const [error, cuidado] = await to(Care.create({
      planta_id: plantId,
      tipo_atividade_id: activityType._id,
      ...care 
    }, {
      options: { session }
    }))
  
    if(error) throw new Error()
  
    return
  } catch(ex){
    throw ex
  }

  return true
}

export default addCareToPlant