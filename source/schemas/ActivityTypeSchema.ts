
import { timestamps } from '../config/globals'

const schema = {

  ...timestamps,

  descricao:{
    type: String,
    required: true
  },

  mensagem_padrao:{
    type: String
  }
}

export default {
  schema,
}
