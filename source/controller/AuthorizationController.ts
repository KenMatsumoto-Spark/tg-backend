import { Request, Response, Router } from 'express'
import UserRules from '../rules/UserRules'
import registerUser from '../features/registerUser'
import signInUser from '../features/loginUser'

const AuthorizationController = Router()

AuthorizationController.post('/register' , async (request: Request, response: Response) => {
  const { userName, password, passwordConfirmation, email } = request.body
  
  const invalid = UserRules.general(
    { userName },
    { password },
    { email },
    { passwordConfirmation: { password, passwordConfirmation }}
  )

  if (invalid) return response.status(422).send({ error: `${invalid[0].field}: ${invalid[0].message}` })

  try {
    const user = await registerUser(userName, email, password)
  
    return response.status(201).send({ user })
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

AuthorizationController.post('/signin', async(request: Request, response: Response) => {
  const { email, password } = request.body

  const invalid = UserRules.general(
    { password },
    { email }
  )
  
  if (invalid) return response.status(422).send({ error: `${invalid[0].field}: ${invalid[0].message}` })

  try{
    const userToken = await signInUser(email, password)

    return response.status(200).send({ userToken })
  }catch(error){
    return response.status(500).send({ error: error?.toString() })
  }
})

export default AuthorizationController