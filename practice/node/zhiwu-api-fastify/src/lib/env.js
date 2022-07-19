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

const setupEnv = (parse = true) => {
	const { error, parsed } = dotenv.config()

	if (error) console.log('找不到 .env 檔')
	else {
		if (parse) {
			for (let k in parsed) {
				const e = parsed[k]
				if (/^\d+$/.test(e)) {
					parsed[k] = Number(e)
				} else if (/^[Tt]rue$/.test(e)) {
					parsed[k] = true
				} else if (/^[Ff]alse/.test(e)) {
					parsed[k] = false
				} else if (/^[\[{].*[\]}]$/.test(e)) {
					try {
						parsed[k] = JSON.parse(e)
					} catch {}
				}
			}
		}
		console.log(parsed)
		console.log('環境變量初始化完成')
	}

	env = parsed

	return error == null
}
