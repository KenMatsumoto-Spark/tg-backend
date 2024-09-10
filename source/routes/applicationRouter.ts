import { Router } from 'express'
import AuthorizationController from '../controller/AuthorizationController'
import cors from 'cors'
import PlantController from '../controller/PlantController'
import authentication from '../middlewares/authentication'
import UserController from '../controller/UserController'

const applicationRouter = Router()
applicationRouter.use(cors())
applicationRouter.use('/unauth', AuthorizationController)
applicationRouter.use('/plants', PlantController)
applicationRouter.use('/auth', authentication, UserController)

export default applicationRouter
