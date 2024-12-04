
import mongoose from 'mongoose'
import { timestamps } from '../config/globals'

const ObjectId = mongoose.Types.ObjectId

const schema = {

  ...timestamps,

  dia: {
    type: String
  },

  mes: {
    type: String
  },

  ano: {
    type: String
  },

  hora: {
    type: String
  },

  minuto: {
    type: String
  },

  cuidado_id: {
    type: ObjectId
  }


}

export default {
  schema,
}
