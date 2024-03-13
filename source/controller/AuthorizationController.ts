import to from 'await-to-js'
import { Request, Response, Router } from 'express'
import User from '../models/User'
import UserRules from '../rules/UserRules'
import registerUser from '../features/registerUser'

const AuthorizationController = Router()

AuthorizationController.post('/register' , async (request: Request, response: Response) => {
  const { userName, password, email } = request.body

  const invalid = UserRules.general(
    { userName },
    { password },
    { email }
  )
  if (invalid) return response.status(422).send({ invalid })

  try {
    const user = await registerUser(userName, email, password)
  
    return response.status(201).send({ user })
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

export default AuthorizationController