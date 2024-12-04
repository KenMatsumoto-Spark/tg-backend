
import to from 'await-to-js'
import 'dotenv/config'
import Care from '../models/Care'
import mongoose from 'mongoose'
import User from '../models/User'
import Plant from '../models/Plant'
import ActivityCare from '../models/ActivityCare'

const listActivityCaresByUser = async (userId: string, plantId: string) => {

  const [errorAtividadeCuidados, atividadeCuidados] = await to(Care.aggregate([
    {
      $match:
        {
          planta_id: new mongoose.Types.ObjectId(plantId)
        }
    },
    {
      $lookup:
        {
          from: "atividade_cuidados",
          localField: "_id",
          foreignField: "cuidado_id",
          as: "result"
        }
    },
    {
      $unwind:
        {
          path: "$result",
          preserveNullAndEmptyArrays: false
        }
    },
    {
      $project:
        {
          dia: "$result.dia",
          mes: "$result.mes",
          ano: "$result.ano",
          hora: "$result.hora",
          minuto: "$result.minuto",
          atividade: "$atividade"
        }
    }
  ]))

  if (errorAtividadeCuidados) throw new Error("erro ao buscar atividades")

  return atividadeCuidados
}

export default listActivityCaresByUser