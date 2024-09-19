import mongoose from 'mongoose'
import requestCheck from 'request-check'
import { isDate } from 'util/types'

const PlantRules = {
  general: (...args: any) => {
    const validator = requestCheck()
    validator.requiredMessage = 'Campo obrigatório!'

    validator.addRule('plantId', {
      validator: (value: string) => mongoose.Types.ObjectId.isValid(value),
      message: 'Id da planta inválido!'
    })

    validator.addRule('tipo_Atividade', {
      validator: (value: string) => value,
      message: ''
    })
    validator.addRule('periodicidade', {
      validator: (value: string) => (value),
      message: ''
    })
    validator.addRule('dataHora', {
      validator: (value: string) => isDate(value),
      message: ''
    })
    validator.addRule('mensagem_notificação', {
      validator: (value: string) => value.length !== 0,
      message: ''
    })

    const invalid = validator.check(...args)

    return invalid
  }

}

export default PlantRules
