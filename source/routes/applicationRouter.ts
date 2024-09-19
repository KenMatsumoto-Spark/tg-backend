import { Router } from 'express'
import AuthorizationController from '../controller/AuthorizationController'
import cors from 'cors'
import PlantController from '../controller/PlantController'
import UserController from '../controller/UserController'
import authentication from '../middlewares/authentication'
import AuthUserController from '../controller/auth/AuthUserController'
import AuthPlantController from '../controller/auth/AuthPlantController'

const applicationRouter = Router()
applicationRouter.use(cors())
applicationRouter.use('/unauth', AuthorizationController)
applicationRouter.use('/unauth', UserController)
applicationRouter.use('/unauth', PlantController)

applicationRouter.use('/auth', authentication, AuthUserController)
applicationRouter.use('/auth', authentication, AuthPlantController)

export default applicationRouter
