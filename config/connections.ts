module.exports.connections = {
	twiceMysqlServer: {
		port: 3306,
		dialect: 'mysql',
		host: '172.16.122.12',
		user: 'twicepixels01',
		password: '!twiceAdm001',
		database: 'twicepixels',
		logging: false,
		pool: {
			min: 0,
			max: 5,
			idle: 10000
		}
	}
};