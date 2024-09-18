import { Request, Response, Router } from 'express'
import User from '../models/User'
import to from 'await-to-js'
import solicitPasswordChange from '../features/resetPasswordSolicit'
import resetPasswordConfirm from '../features/resetPasswordChange'

const UserController = Router()

UserController.post('/info' , async (request: Request, response: Response) => {
  const { plantName } = request.query
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

UserController.post('/password/solicit', async (request: Request, response: Response) => {

  const { email } = request.body
  console.log({ email })

  if(!email) throw new Error('Obrigatorio envio do email')
  try {
    await solicitPasswordChange(email)

    return response.status(202).send('Token Confirmado.')
  } 
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

UserController.post('/password/cofirm', async (request: Request, response: Response) => {

  const {  passwordResetCode } = request.body

  try {
    // await resetPasswordConfirm( passwordResetCode )

    return response.status(202).send('Email Enviado.')
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

UserController.post('/password/cofirm', async (request: Request, response: Response) => {

  const { password, corfirmPassword, passwordResetCode } = request.body

  try {
    await resetPasswordConfirm( password, corfirmPassword, passwordResetCode )

    return response.status(202).send('Sernha redefinida com sucesso.')
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

export default UserController