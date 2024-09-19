import { timestamps } from '../config/globals'

const schema = {

  ...timestamps,

  nome: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique:true
  },

  senha: {
    type: String,
    required: true
  },

  codigoRedefinicaoSenha: {
    type: String,
    default: "codigoDeRedefiniçãoDesativado"
  }
}

export default {
  schema,
}
