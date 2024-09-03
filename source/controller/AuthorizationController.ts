import { Request, Response, Router } from 'express'
import UserRules from '../rules/UserRules'
import registerUser from '../features/registerUser'
import signInUser from '../features/loginUser'

const AuthorizationController = Router()

AuthorizationController.post('/register' , async (request: Request, response: Response) => {
  const { userName, password, email } = request.body
  console.log({ userName, password, email })
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

AuthorizationController.post('/signin', async(request: Request, response: Response) => {
  const { email, password } = request.body
  console.log({ email, password })
  try{
    const user = await signInUser(email, password)
    console.log({ user })

    
    const mockUser = {
      _id: '65f38fc78002e3a01167509f',
      userName: 'testemock'
    }

    return response.status(200).send({ user: mockUser })
  }catch(error){
    return response.status(500).send({ error: error?.toString() })
  }
})

export default AuthorizationController