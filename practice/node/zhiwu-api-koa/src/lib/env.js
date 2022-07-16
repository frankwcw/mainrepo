import dotenv from 'dotenv'

export { setupEnv, env }

/**
 * PORT? 預設 7777
 * MONGOGB_URI
 * @type {{
 *   [
 * 	   key in
 * 	   'PORT' | 'MONGOGB_URI'
 *   ]: any
 * }}
 */
let env

const setupEnv = () => {
	const { error, parsed } = dotenv.config()

	if (error) console.log('找不到 .env 檔')

	env = parsed

	return error == null
}
