import mongoose from 'mongoose'
import { env } from './env'

export { setupMongodb }

const setupMongodb = async () => {
	try {
		await mongoose.connect(env.MONGOGB_URI)
		console.log('mongodb 連接成功!')
		return true
	} catch (err) {
		console.error(err)
	}
	return false
}
