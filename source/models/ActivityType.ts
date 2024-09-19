import mongoose from 'mongoose'
import AutoIncrementFactory from 'mongoose-sequence'
import ActivityTypeSchema from '../schemas/ActivityTypeSchema'
import IActivityType from '../interfaces/IActivityType'



const AutoIncrement = AutoIncrementFactory(mongoose.connection)

interface IActivityTypeModel extends mongoose.Model<IActivityType> {}

const ActivityType: mongoose.Schema = new mongoose.Schema(ActivityTypeSchema.schema, { timestamps: true })

ActivityType.plugin(AutoIncrement, { inc_field: 'ActivityTypeCode' })

export default mongoose.model<IActivityType, IActivityTypeModel>('Tipo_Atividade', ActivityType)
