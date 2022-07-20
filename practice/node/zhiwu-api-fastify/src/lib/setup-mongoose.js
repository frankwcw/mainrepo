import mongoose from 'mongoose'
import { env } from './env'

export { setupMongoose }

const setupMongoose = async ({ log } = {}) => {
	await mongoose.connect(env.MONGOGB_URI)

	log?.('Mongodb 已連接')
}
