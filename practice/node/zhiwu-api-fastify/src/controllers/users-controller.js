import user from '../models/user-model'

export { getList, get, create, update, del }

/** @type {(req: FastifyRequest, opts: FastifyReply) => Promise<any>} */
const getList = async (req, rep) => {
	try {
		return await user.find()
	} catch (err) {
		throw err
	}
}

/** @type {(req: FastifyRequest, opts: FastifyReply) => Promise<any>} */
const get = async (req, rep) => {
	try {
		const { id } = req.params.id
		return user.findById(id)
	} catch (err) {
		rep.statusCode = 404
		throw err
	}
}

/** @type {(req: FastifyRequest, opts: FastifyReply) => Promise<any>} */
const create = async (req, rep) => {
	try {
		const user = new user(req.body)
		return user.save()
	} catch (err) {
		throw err
	}
}

/** @type {(req: FastifyRequest, opts: FastifyReply) => Promise<any>} */
const update = async (req, rep) => {
	try {
		const { id } = req.params
		return await user.findByIdAndUpdate(id, req.body, {
			new: true,
		})
	} catch (err) {
		throw err
	}
}

/** @type {(req: FastifyRequest, opts: FastifyReply) => Promise<any>} */
const del = async (req, rep) => {
	try {
		const { id } = req.params
		await user.findByIdAndRemove(id)
		rep.statusCode = 214
		return
	} catch (err) {
		throw err
	}
}
