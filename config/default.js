'use strict';

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
	}
}
//'mongodb://localhost:27017/elm'
//'mongodb://localhost:27017/blog'