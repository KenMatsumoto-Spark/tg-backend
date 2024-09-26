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
const unauthRouter = Router()


applicationRouter.use(cors())

applicationRouter.use('/unauth', unauthRouter)
unauthRouter.use('/authentication', AuthorizationController)
unauthRouter.use('/user', UserController)
unauthRouter.use('/plant', PlantController)


applicationRouter.use('/auth', authentication, authRouter)
authRouter.use('/user', AuthUserController)
authRouter.use('/plant', AuthPlantController)

export default applicationRouter
