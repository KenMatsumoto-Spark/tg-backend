import mongoose from 'mongoose'
import AutoIncrementFactory from 'mongoose-sequence'
import IActivityCare from '../interfaces/IActivityCare'
import ActivityCareSchema from '../schemas/ActivityCareSchema'



const AutoIncrement = AutoIncrementFactory(mongoose.connection)

interface IActivityCareModel extends mongoose.Model<IActivityCare> {}

const ActivityCare: mongoose.Schema = new mongoose.Schema(ActivityCareSchema.schema, { timestamps: true })

ActivityCare.plugin(AutoIncrement, { inc_field: 'ActivityCareCode' })

export default mongoose.model<IActivityCare, IActivityCareModel>('Atividade_Cuidado', ActivityCare)
