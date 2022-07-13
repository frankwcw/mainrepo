import dotenv from 'dotenv'

export { initEnvConfig, env }

let env

const initEnvConfig = () => {
	const { error, parsed } = dotenv.config()

	if (error) console.log('找不到 .env 檔')

	env = parsed

	return error == null
}
