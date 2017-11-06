'use strict';
import path from 'path'

module.exports = {
	port: 1677,
	url: 'mongodb://localhost:27017/blog',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	},
	rootPath:path.dirname(require.main.filename)
}
//'mongodb://localhost:27017/elm'
//'mongodb://localhost:27017/blog'