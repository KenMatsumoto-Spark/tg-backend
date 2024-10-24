import { Request, Response, Router } from 'express'
import searchPlant from '../features/searchPlants'
import getPlantInfo from '../features/getPlantInfo'
import listActivities from '../features/listActivities'

const PlantController = Router()

PlantController.get('/search' , async (request: Request, response: Response) => {
  const { plantName } = request.query

  try {
    const plants = await searchPlant(plantName)
  
    return response.status(202).send({ plants })
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.get('/info' , async (request: Request, response: Response) => {
  const { plant_access_token } = request.query

  try {
    const plants = await getPlantInfo(plant_access_token)
  
    return response.status(202).send({ plants })
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

PlantController.get('/activity/list' , async (request: Request, response: Response) => {
  const { plant_access_token } = request.query

  try {
    const activities = await listActivities()
  
    return response.status(202).send({ atividades: activities })
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})




export default PlantController