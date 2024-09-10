import { to } from 'await-to-js'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/User'

const authentication = async function (request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response.status(401).send('Acesso negado: usuário não autenticado.')
    }

    const [header, token] = authHeader.split(' ')

    if (String(header).toLowerCase() !== 'bearer') {
      return response.status(401).send('Acesso negado: tipo de autorização incorreta.')
    }

    jwt.verify(token, process.env.AUTH_PRIVATE_KEY, async (error, decriptedJwt) => {
      try {
        if (error) return response.status(401).send('Acesso negado: token expirada.')

        if (!decriptedJwt) return response.status(401).send('Acesso negado: token inválida.')

        if (decriptedJwt?.user?._id) {
          
          const [userError, user] = await to(User.findOne(new mongoose.Types.ObjectId(decriptedJwt.user._id)))
          console.log({ userError, user })
          if (userError) return response.status(404).send('Ocorreu um erro ao encontrar o usuario!', { error: userError })

          if (!user) return response.status(401).send('Acesso negado: usuário não existe!')

          request.userId = user._id
        }

        return next()
      } catch (error) {
        return response.status(401).send(error)
      }
    })
  } catch (error) {
    return response.status(401).send(error)
  }
}

export default authentication
