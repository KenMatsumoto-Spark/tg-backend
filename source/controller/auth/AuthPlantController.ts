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
import toogleCareActive from '../../features/toogleCareActive'
import deleteCares from '../../features/deleteCares'
import deletePlant from '../../features/deletePlant'
import patchPlant from '../../features/patchPlant'
import addActivityRegister from '../../features/addActivityCare'
import addActivityCare from '../../features/addActivityCare'
import listActivityCaresByUser from '../../features/listActivityCaresByUser'
import listCaresByPlant from '../../features/listCaresByPlant'

const PlantController = Router()

PlantController.get('/:plantId/show', async (request: Request, response: Response) => {
  const { plantId } = request.params
  const userId = request.userId

  const invalid = PlantRules.general(
    { plantId }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {

    const plant = await showPlantByUser(userId, plantId)

    if (!plant) throw new Error("A planta não foi encontrada.")

    const cares = await showPlantCare(plantId)

    return response.status(202).send({ plant, cares })
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.get('/list', async (request: Request, response: Response) => {
  const userId = request.userId

  try {
    const list = await listPlantsByUser(userId)

    return response.status(200).send({ list })
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.post('/add', async (request: Request, response: Response) => {
  const { plant_access_token } = request.query

  const userId = request.userId

  try {
    const plant = await getPlantInfo(plant_access_token)

    if (!plant) throw new Error("A planta não foi encontrada.")

    await addPlant(userId, plant, plant_access_token)

    return response.status(202).send("planta adicionada com sucesso")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.get('/:plantId/care/:careId/show', async (request: Request, response: Response) => {
  const { plantId, careId } = request.params
  const { userId } = request.userId

  const invalid = PlantRules.general(
    { plantId },
    { careId }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    const care = await showCare(plantId, careId)
    return response.status(200).send("Cuidado da planta adicionada com sucesso")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.patch('/:plantId/care/:careId/edit', async (request: Request, response: Response) => {
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
    await editCare(plantId, careId, { tipo_Atividade, periodicidade, dataHora, mensagem_notificação })

    return response.status(200).send("Cuidado da planta adicionada com sucesso")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.post('/:plantId/care/add', async (request: Request, response: Response) => {
  const { plantId } = request.params
  const userId = request.userId

  const { id, atividade, hora, minuto, frequencia, dia, texto, ativa } = request.body

  const invalid = PlantRules.general(
    { atividade },
    { hora },
    { minuto },
    { frequencia },
    { dia },
    { ativa }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    await addCareToPlant(userId, plantId, { id, atividade, hora, minuto, frequencia, dia, texto, ativa })

    return response.status(200).send("Cuidado da planta adicionada com sucesso.")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.patch('/:plantId', async (request: Request, response: Response) => {
  const { plantId } = request.params
  const userId = request.userId

  const name = request.body.name

  const invalid = PlantRules.general(
    { plantId },
    { name }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    await patchPlant(plantId, name)

    return response.status(200).send("Planta editada com sucesso.")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.delete('/:plantId', async (request: Request, response: Response) => {
  const { plantId } = request.params
  const userId = request.userId

  const invalid = PlantRules.general(
    { plantId },
    { userId }
  )
  if (invalid) return response.status(422).send({ invalid })

  try {
    await deletePlant(plantId, userId)

    return response.status(200).send("Planta removida com sucesso.")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.delete('/:plantId/care/:careId', async (request: Request, response: Response) => {
  const { plantId, careId } = request.params

  const invalid = PlantRules.general(
    { plantId },
    { careId }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    await deleteCares(plantId, careId)

    return response.status(202).send("Cuidado da planta removido com sucesso.")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})


PlantController.post('/care/:careId/toogle', async (request: Request, response: Response) => {
  const { careId } = request.params

  try {
    await toogleCareActive(careId)

    return response.status(200).send("Cuidado alterado con sucesso.")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.post('/care/:careId/activity-care', async (request: Request, response: Response) => {
  const { careId } = request.params

  const { dia, mes, ano, minuto, hora } = request.body

  const invalid = PlantRules.general(
    { careId },
    { hora },
    { minuto }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    await addActivityCare(careId, dia, mes, ano, minuto, hora)

    return response.status(200).send("Cuidado alterado con sucesso.")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.get('/:plantId/activity-care', async (request: Request, response: Response) => {
  const userId = request.userId
  const plantId = request.params

  const invalid = PlantRules.general(
    { plantId }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    const activityCareList = await listActivityCaresByUser(userId, plantId)

    return response.status(200).send({ activityCareList })
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})
PlantController.get('/:plantId/care', async (request: Request, response: Response) => {
  const plantId = request.params

  const invalid = PlantRules.general(
    { plantId }
  )

  if (invalid) return response.status(422).send({ invalid })

  try {
    const careList = await listCaresByPlant(plantId)

    return response.status(200).send({ careList })
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

export default PlantController