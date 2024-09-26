import { Router } from 'express'
import AuthorizationController from '../controller/AuthorizationController'
import cors from 'cors'
import PlantController from '../controller/PlantController'
import UserController from '../controller/UserController'
import authentication from '../middlewares/authentication'
import AuthUserController from '../controller/auth/AuthUserController'
import AuthPlantController from '../controller/auth/AuthPlantController'

const applicationRouter = Router()
const authRouter = Router()


applicationRouter.use(cors())
applicationRouter.use('/unauth', AuthorizationController)
applicationRouter.use('/unauth', UserController)
applicationRouter.use('/unauth/plants', PlantController)

applicationRouter.use('/auth', authentication, authRouter)
applicationRouter.use('/auth', authentication, authRouter)

authRouter.use('/user', AuthUserController)
authRouter.use('/plant', AuthPlantController)

export default applicationRouter
