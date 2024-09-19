import { Request, Response, Router } from 'express'
import getPlantInfo from '../../features/getPlantInfo'
import addPlant from '../../features/addPlant'
import PlantRules from '../../rules/PlantRules'
import showPlantByUser from '../../features/showPlantByUser'
import listPlantsByUser from '../../features/listPlantsByUser'
import addCareToPlant from '../../features/addCaretoPlant'

const PlantController = Router()

PlantController.get('/:plantId/show' , async (request: Request, response: Response) => {
  const { plantId } = request.params
  const { userId } = request.userId

  const invalid = PlantRules.general(
    { plantId }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    
    const plant = await showPlantByUser(userId, plantId)
  
    if(!plant) throw new Error("A planta não foi encontrada.")

    return response.status(202).send("planta encontrada com sucesso", { plant })
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.get('/list' , async (request: Request, response: Response) => {
  const { userId } = request.userId
  const { page = 1 , limit = 10 } = request.query

  try {
    await listPlantsByUser(userId, page, limit)

    return response.status(202).send("plantas encontrada com sucesso")
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.get('/add' , async (request: Request, response: Response) => {
  const { plant_access_token } = request.query

  const { userId } = request.userId

  try {
    const plant = await getPlantInfo(plant_access_token)
  
    if(!plant) throw new Error("A planta não foi encontrada.")

    await addPlant(userId, plant, plant_access_token)

    return response.status(202).send("planta adicionada com sucesso")
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.get('/:plantId/care/add' , async (request: Request, response: Response) => {
  const { plantId } = request.params
  const { userId } = request.userId

  const { tipo_Atividade, periodicidade, dataHora, mensagem_notificação } = request.body

  const invalid = PlantRules.general(
    { plantId },
    { tipo_Atividade },
    { periodicidade },
    { dataHora },
    { mensagem_notificação }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    await addCareToPlant(userId, plantId, {tipo_Atividade, periodicidade, dataHora, mensagem_notificação})

    return response.status(202).send("Cuidado da planta adicionada com sucesso")
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})


export default PlantController