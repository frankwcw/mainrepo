export { mergeUrl }

const mergeUrl = (...strs) => {
	if (!Array.isArray(strs) || strs.length === 0) return '/'

	let url = ''
	for (let i = 0; i < strs.length; i++) {
		const str = strs[i]
		url += `/${str.match(/^\/*(.*)$/)[1]}`
	}

	return url
}
