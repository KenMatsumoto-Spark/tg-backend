import { Request, Response, Router } from 'express'
import searchPlant from '../features/searchPlants'
import getPlantInfo from '../features/getPlantInfo'
import mongoose from 'mongoose'
import User from '../models/User'
import to from 'await-to-js'

const UserController = Router()

UserController.post('/info' , async (request: Request, response: Response) => {
  const { plantName } = request.query
  const userId = request.userId

  try {
    const [userError, user] = await to(User.findOne({ _id: userId }))
    if(userError) throw new Error(userError.toString())
    if(!user) throw new Error('usuario não encontrado')

    const userInfo = {
      name: user.name,
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