import requestCheck from 'request-check'
import owasp from 'owasp-password-strength-test'

owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 6,
  minPhraseLength: 20,
  minOptionalTestsToPass: 4
})

const userName = (userName:string) =>
/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.]+$/.test(userName) &&
String(userName).trim().split(' ').length === 1

const email = (email: string) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email.trim())
}

const validateOWSPPassword = (password:string) => {
  const chkPassword = owasp.test(password)
  return (!(chkPassword?.requiredTestErrors && chkPassword?.requiredTestErrors?.length))
}

const UserRules = {
  general: (...args: any) => {
    const validator = requestCheck()
    validator.requiredMessage = 'Campo obrigatório!'

    validator.addRule('userName', {
      validator: (value: string) => userName(value),
      message: 'Nome não conter caracteres especiais!'
    })

    validator.addRule('email', {
      validator: (value: string) => email(value),
      message: 'Email inválido!'
    })

    validator.addRule('password', {
      validator: (value: string) => {
        if (!value) return false

        const isValidPassword = validateOWSPPassword(value)

        return isValidPassword
      },
      message: 'É obrigatório o uso de no mínimo 6 caracteres'
    })

    validator.addRule('passwordResetCode', {
      validator: (value: string) => value.trim().length == 6,
      message: 'Codigo de recuperação de senha inválido!'
    })

    validator.addRule('passwordConfirmation', {
      validator: (value: any) => value.password == value.passwordConfirmation,
      message: 'Senhas não coincidem!'
    })

    const invalid = validator.check(...args)

    return invalid
  }

}

export default UserRules
