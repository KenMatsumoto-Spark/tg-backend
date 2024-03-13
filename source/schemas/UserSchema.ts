import { timestamps } from '../config/globals'

const schema = {

  ...timestamps,

  userName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
}

export default {
  schema,
}
