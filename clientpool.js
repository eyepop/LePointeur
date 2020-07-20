var pg = require('pg');

var config = {
	user: 'xsovfwvzofjjlv',
	database: 'deqv1mlvv43bvp',
	password: '3fb2a9f2e20849be92abafe922d4fb4302e06606047756323f9a3ba4197c241a',
	host: 'ec2-54-75-244-161.eu-west-1.compute.amazonaws.com',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 50000,
};

var pool = new pg.Pool(config);
module.exports = pool;
