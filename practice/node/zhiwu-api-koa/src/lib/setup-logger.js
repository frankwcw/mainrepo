import log4js from 'log4js'
import { resolve } from 'path'

export { setupLogger }

const setupLogger = () => {
	log4js.configure({
		appenders: {
			normal: {
				type: 'file',
				filename: resolve(__dirname, './logs/access.log'),
				maxLogSize: 20000000, // 20 MB
				backups: 10, // 保留 10 份
			},
		},
		categories: {
			default: {
				appenders: ['normal'],
				level: 'INFO',
			},
		},
	})

	const logger = log4js.getLogger('normal')
	log4js.connectLogger()
	logger.info('初始化 logger 成功')
}
