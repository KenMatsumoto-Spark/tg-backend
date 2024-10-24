import { Request, Response, Router } from 'express'
import getPlantInfo from '../../features/getPlantInfo'
import addPlant from '../../features/addPlant'
import PlantRules from '../../rules/PlantRules'
import showPlantByUser from '../../features/showPlantByUser'
import listPlantsByUser from '../../features/listPlantsByUser'
import addCareToPlant from '../../features/addCareToPlant'
import showPlantCare from '../../features/showPlantCare'
import showCare from '../../features/showCare'
import editCare from '../../features/editCare'

const PlantController = Router()

PlantController.get('/:plantId/show' , async (request: Request, response: Response) => {
  const { plantId } = request.params
  const userId = request.userId

  const invalid = PlantRules.general(
    { plantId }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    
    const plant = await showPlantByUser(userId, plantId)
  
    if(!plant) throw new Error("A planta não foi encontrada.")

    const cares = await showPlantCare(plantId)
    
    return response.status(202).send({ plant, cares })
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.get('/list' , async (request: Request, response: Response) => {
  const userId = request.userId

  try {
    const list = await listPlantsByUser(userId)

    return response.status(202).send({ list })
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.post('/add' , async (request: Request, response: Response) => {
  const { plant_access_token } = request.query

  const userId = request.userId

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

PlantController.get('/:plantId/care/:careId/show' , async (request: Request, response: Response) => {
  const { plantId, careId } = request.params
  const { userId } = request.userId

  const invalid = PlantRules.general(
    { plantId },
    { careId }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    const care = await showCare(plantId, careId)
    return response.status(202).send("Cuidado da planta adicionada com sucesso")
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.patch('/:plantId/care/:careId/edit' , async (request: Request, response: Response) => {
  const { plantId, careId } = request.params
  const userId = request.userId

  const { tipo_Atividade, periodicidade, dataHora, mensagem_notificação } = request.body

  const invalid = PlantRules.general(
    { plantId },
    { careId },
    { tipo_Atividade },
    { periodicidade },
    { dataHora },
    { mensagem_notificação }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    await editCare(plantId, careId, {tipo_Atividade, periodicidade, dataHora, mensagem_notificação})

    return response.status(202).send("Cuidado da planta adicionada com sucesso")
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.post('/:plantId/care/add' , async (request: Request, response: Response) => {
  const { plantId } = request.params
  const userId = request.userId

  const { id, atividade, hora, minuto, frequencia, dia, texto, ativa } = request.body

  const invalid = PlantRules.general(
    // { plantId },
    // { tipo_Atividade },
    // { periodicidade },
    // { dataHora },
    // { mensagem_notificação }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    await addCareToPlant(userId, plantId, {id, atividade, hora, minuto, frequencia, dia, texto, ativa })

    return response.status(202).send("Cuidado da planta adicionada com sucesso.")
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})


export default PlantController