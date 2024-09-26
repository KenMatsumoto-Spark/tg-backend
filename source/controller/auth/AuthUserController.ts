import { Request, Response, Router } from 'express'
import to from 'await-to-js'
import User from '../../models/User'


const UserController = Router()

UserController.get('/info' , async (request: Request, response: Response) => {
  const userId = request.userId

  try {
    const [userError, user] = await to(User.findOne({ _id: userId }))
    if(userError) throw new Error(userError.toString())
    if(!user) throw new Error('usuario não encontrado')

    const userInfo = {
      name: user.nome,
      _id: user._id,
      email: user.email,
      code: user.userCode,
      createdAt: user.createdAt
    }

    return response.status(202).send(userInfo)
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})




export default UserController