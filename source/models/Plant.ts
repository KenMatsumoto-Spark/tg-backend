import mongoose from 'mongoose'
import AutoIncrementFactory from 'mongoose-sequence'
import IPlant from '../interfaces/IPlant'
import PlantSchema from '../schemas/PlantSchema'


const AutoIncrement = AutoIncrementFactory(mongoose.connection)

interface IPlantModel extends mongoose.Model<IPlant> {}

const Plant: mongoose.Schema = new mongoose.Schema(PlantSchema.schema, { timestamps: true })

Plant.plugin(AutoIncrement, { inc_field: 'plantCode' })

export default mongoose.model<IPlant, IPlantModel>('Plant', Plant)
