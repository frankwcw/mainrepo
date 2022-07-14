import { model, Schema } from 'mongoose'

export { userModel }

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
})

const userModel = model('User', userSchema)
