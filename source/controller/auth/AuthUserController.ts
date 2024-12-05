import { Request, Response, Router } from 'express'
import to from 'await-to-js'
import User from '../../models/User'
import deleteUser from '../../features/deleteUser'
import patchUser from '../../features/patchUser'
import UserRules from '../../rules/UserRules'
import listCaresByUser from '../../features/listCaresByUser'
import resetPasswordChangeLoggedUser from '../../features/resetPasswordChangeLoggedUser'


const UserController = Router()

UserController.get('/info', async (request: Request, response: Response) => {
  const userId = request.userId

  try {
    const [userError, user] = await to(User.findOne({ _id: userId }))
    if (userError) throw new Error(userError.toString())
    if (!user) throw new Error('usuario não encontrado')

    const userInfo = {
      name: user.nome,
      _id: user._id,
      email: user.email,
      code: user.userCode,
      createdAt: user.createdAt
    }

    return response.status(200).send(userInfo)
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

UserController.delete('/account', async (request: Request, response: Response) => {
  const userId = request.userId
  const { email } = request.body

  try {

    const invalid = UserRules.general(
      { email }
    )

    if (invalid) return response.status(422).send({ error: `${invalid[0].field}: ${invalid[0].message}` })

    await deleteUser(userId, email)

    return response.status(200).send("Usuario excluido.")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

UserController.patch('/edit', async (request: Request, response: Response) => {
  const userId = request.userId
  const { name, avatar } = request.body

  try {

    const invalid = UserRules.general(
      { userName: name }
    )

    if (invalid) return response.status(422).send({ error: `${invalid[0].field}: ${invalid[0].message}` })

    await patchUser(userId, name, avatar)

    return response.status(200).send("Usuario alterado com sucesso.")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

UserController.patch('/password', async (request: Request, response: Response) => {
  const userId = request.userId

  const { oldPassword, password, passwordConfirmation } = request.body

  const invalid = UserRules.general(
    { password },
    { passwordConfirmation: { password, passwordConfirmation } }
  )

  if (invalid) return response.status(422).send({ error: `${invalid[0].field}: ${invalid[0].message}` })

  try {

    await resetPasswordChangeLoggedUser(oldPassword, password, passwordConfirmation, userId)

    return response.status(200).send("Senha do usuario alterada com sucesso.")
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

UserController.get('/care/list', async (request: Request, response: Response) => {
  const userId = request.userId

  try {

    const cares = await listCaresByUser(userId)

    console.log({ cares })
    return response.status(200).send({ cares })
  }
  catch (error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

export default UserController