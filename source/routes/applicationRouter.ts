import { Router } from 'express'
import AuthorizationController from '../controller/AuthorizationController'

const applicationRouter = Router()

applicationRouter.use('/unauth', AuthorizationController)

export default applicationRouter
