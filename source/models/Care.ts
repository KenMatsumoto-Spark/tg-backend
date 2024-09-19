import mongoose from 'mongoose'
import AutoIncrementFactory from 'mongoose-sequence'
import ICare from '../interfaces/ICare'
import CareSchema from '../schemas/CareSchema'


const AutoIncrement = AutoIncrementFactory(mongoose.connection)

interface ICareModel extends mongoose.Model<ICare> {}

const Care: mongoose.Schema = new mongoose.Schema(CareSchema.schema, { timestamps: true })

Care.plugin(AutoIncrement, { inc_field: 'careCode' })

export default mongoose.model<ICare, ICareModel>('Cuidado', Care)
