import { Request, Response, Router } from 'express'
import solicitPasswordChange from '../features/resetPasswordSolicit'
import UserRules from '../rules/UserRules'
import resetPasswordConfirm from '../features/resetPasswordConfirm'
import resetPasswordChange from '../features/resetPasswordChange'

const UserController = Router()

UserController.post('/password/solicit', async (request: Request, response: Response) => {

  const { email } = request.body

  const invalid = UserRules.general(
    { email }
  )
  
  if (invalid) return response.status(422).send({ error: `${invalid[0].field}: ${invalid[0].message}` })
    
  if(!email) throw new Error('Obrigatorio envio do email')
  try {
    await solicitPasswordChange(email)

    return response.status(200).send('Token Confirmado.')
  } 
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

UserController.post('/password/confirm', async (request: Request, response: Response) => {

  const {  passwordResetCode } = request.body

  const invalid = UserRules.general(
    { passwordResetCode }
  )
  
  if (invalid) return response.status(422).send({ error: `${invalid[0].field}: ${invalid[0].message}` })

  try {
    await resetPasswordConfirm( passwordResetCode )

    return response.status(200).send('Codigo de mudança de senha confirmado.')
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

UserController.post('/password/new', async (request: Request, response: Response) => {

  const { password, passwordConfirmation, passwordResetCode } = request.body

  const invalid = UserRules.general(
    { passwordResetCode },
    { password },
    { passwordConfirmation: { password, passwordConfirmation }}
  )
  
  if (invalid) return response.status(422).send({ error: `${invalid[0].field}: ${invalid[0].message}` })

  try {
    await resetPasswordChange( password, passwordConfirmation, passwordResetCode )

    return response.status(200).send('Sernha redefinida com sucesso.')
  }
  catch(error) {
    return response.status(500).send({ error: error?.toString() })
  }
})

export default UserController