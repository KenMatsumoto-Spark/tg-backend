
import { timestamps } from '../config/globals'

const schema = {

  ...timestamps,

  descricao:{
    type: String,
    required: true
  }
}

export default {
  schema,
}
