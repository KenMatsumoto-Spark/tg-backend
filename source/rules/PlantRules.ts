import mongoose from 'mongoose'
import requestCheck from 'request-check'
import { isBoolean } from 'util';

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const PlantRules = {
  general: (...args: any) => {
    const validator = requestCheck()
    validator.requiredMessage = 'Campo obrigatório!'

    validator.addRule('plantId', {
      validator: (value: string) => mongoose.Types.ObjectId.isValid(value),
      message: 'Id da planta inválido!'
    })

    validator.addRule('careId', {
      validator: (value: string) => mongoose.Types.ObjectId.isValid(value),
      message: 'Id do cuidado inválido!'
    })

    validator.addRule('atividade', {
      validator: (value: string) => value,
      message: ''
    })
    validator.addRule('dia', {
      validator: (value) => (['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].includes(value.toLowerCase())),
      message: ''
    })
    validator.addRule('hora', {
      validator: (value: string) => isNumber(value),
      message: ''
    })
    validator.addRule('minuto', {
      validator: (value: string) => isNumber(value),
      message: ''
    })
    validator.addRule('frequencia', {
      validator: (value: string) => (['hoje', 'diariamente', 'semanalmente'].includes(value.toLowerCase())),
      message: ''
    })
    validator.addRule('ativa', {
      validator: (value: string) => isBoolean(value),
      message: ''
    })
    validator.addRule('ativa', {
      validator: (value: string) => isBoolean(value),
      message: ''
    })
    validator.addRule('name', {
      validator: (value: string) => (value.trim().length >= 4),
      message: ''
    })

    const invalid = validator.check(...args)

    return invalid
  }

}

export default PlantRules
