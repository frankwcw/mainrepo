import { model, Schema } from 'mongoose'

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
})

export default model('User', userSchema)
