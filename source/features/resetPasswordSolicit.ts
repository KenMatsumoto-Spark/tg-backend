import bcrypt from 'bcrypt'
import User from '../models/User'
import to from 'await-to-js'
import randomString from 'randomString'
import Mailjet from 'node-mailjet'
import 'dotenv/config'

const solicitPasswordChange = async (email) => {

  const [error, user] = await to(User.findOne({
    email
  }))

  if(error) throw new Error(error.toString())

  if(!user) throw new Error('Usuario não encontrado.')

  const newPasswordResetCode = randomString.generate({ length: 6, charset: 'numeric'})
  console.log({ newPasswordResetCode})
  
  const [errorUpdate, userUpdate] = await to(User.updateOne({
    _id: user._id
  },{
    codigoRedefinicaoSenha: newPasswordResetCode
  }))
  console.log({ errorUpdate, userUpdate })
  
  if(errorUpdate) throw new Error(errorUpdate.toString())
    
  const mailjet = new Mailjet({
    apiKey: process.env.EMAIL_API_KEY,
    apiSecret: process.env.EMAIL_SECRET_KEY
  });
  
  const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
          {
              "From": {
                  "Email": "h264matsumoto@gmail.com",
                  "Name": "Redefinir Senha"
              },
              "To": [
                  {
                      "Email": email,
                      "Name": user.nome
                  }
              ],
              "Subject": "Redefinição de Senha",
              "TextPart": "",
              "HTMLPart": `
              
              <h3>Para alterar sua senha acesse: <a href=\"https://www.mailjet.com/\">ALTERAR SENHA</a>!</h3><br /> e digite o codigo ${newPasswordResetCode}`
          }
      ]
    })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      throw new Error(err)
    })
  
  return true
}

export default solicitPasswordChange