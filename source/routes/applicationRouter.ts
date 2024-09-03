import { Router } from 'express'
import AuthorizationController from '../controller/AuthorizationController'
import cors from 'cors'
import PlantController from '../controller/PlantController'

const applicationRouter = Router()
applicationRouter.use(cors())
applicationRouter.use('/unauth', AuthorizationController)
applicationRouter.use('/plants', PlantController)

export default applicationRouter
