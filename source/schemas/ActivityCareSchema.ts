
import mongoose from 'mongoose'
import { timestamps } from '../config/globals'

const ObjectId = mongoose.Types.ObjectId

const schema = {

  ...timestamps,

  efetuado:{
    type: Boolean
  },

  dataHora: {
    type: Date
  },

  observacoes:{
    type: String
  },

  cuidado_id:{
    Type: ObjectId
  }

  
}

export default {
  schema,
}
