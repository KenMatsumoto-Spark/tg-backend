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
               <!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>OTP Email Template</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

  <link rel="stylesheet" href="/style.css">
              
</head>


<body style= "font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0;">
  <div class="container-sec" style = "background-color: #green;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;">
    <div class="text-center">
      <div><i class="fas fa-lock otp-lock" style = "  color: #333;
  font-size: 80px;"></i></div>
      <div class="welcome-section" style = "background: green;
  padding: 30px;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  margin: 20px 0px;">
        <div class="app-name" style ="  font-size: 30px;
  font-weight: 800;
  margin: 7px 0px;">
          Green Care
        </div>
        <div class="welcome-text" style="font-family: monospace;">
          Para alterar sua senha use o código abaixo:
        </div>

        <div class="verify-text" style="  margin-top: 25px;
  font-size: 25px;
  letter-spacing: 3px;">
          ${newPasswordResetCode}
        </div>

      </div>
      <h2>Caso não encontre o e-mail, verifique sua caixa de spam.</h2>
      <h2>Se você não esqueceu sua senha, desconsidere este e-mail.</h2>
    </div>

  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>
`
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