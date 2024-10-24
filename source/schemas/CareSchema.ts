
import mongoose from 'mongoose'
import { timestamps } from '../config/globals'

const ObjectId = mongoose.Types.ObjectId

const schema = {

  ...timestamps,

  planta_id:{
    type: ObjectId,
    required: true
  },

  id:{
    type: String,
    required: true
  },

  atividade:{
    type: String,
    required: true
  },

  hora:{
    type: String,
    required: true
  },

  minuto:{
    type: String,
    required: true
  },

  frequencia:{
    type: String,
    required: true
  },

  dia:{
    type: String,
    required: true
  },

  texto:{
    type: String,
    required: true
  },

  ativa:{
    type: String,
    required: true
  },

  dataHora:{
    type: Date
  }

}

export default {
  schema,
}
