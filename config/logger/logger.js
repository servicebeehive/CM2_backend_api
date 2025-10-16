'use strict'

const winston = require('winston')

// const myFormat = printf(({ timestamp, level, message, meta }) => {
// 	return `${timestamp};${level};${message};${meta? JSON.stringify(meta) : ''}`;
//   });

const loggerConfiguration = {
	'transports':[
	    new winston.transports.File({

			  level: 'info',
		      colorize: false,
		      timestamp: true,
		      json: true, 
		      maxsize: 5242880,
		      maxFile: 10,
		      logstash: false,
		      tailable: true,
        	  filename : "./log/dev.log",
			  //format:  winston.format.json()
			  //format: winston.format.printf(info => `${new Date().toISOString()} ${JSON.stringify(winston.format.json())}`)

	    	}),
	      new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: true,
            colorize: true,
			format: winston.format.json()
			//format: winston.format.printf(info => `${new Date().toISOString()} ${JSON.stringifywinston.format.json()}`)
        })
	    
	]	
}

const logger = winston.createLogger(loggerConfiguration)

module.exports = logger

