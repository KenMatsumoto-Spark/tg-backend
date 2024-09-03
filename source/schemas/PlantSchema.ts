
import mongoose from 'mongoose'
import { timestamps } from '../config/globals'

const ObjectId = mongoose.Types.ObjectId

const schema = {

  ...timestamps,

  userId:{
    type: ObjectId,
    required: true
  },

  
}

export default {
  schema,
}
