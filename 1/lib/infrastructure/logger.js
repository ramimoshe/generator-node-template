'use strict';

const winston = require('winston');

winston.add(winston.transports.File, { filename: 'messageService.log' });

module.exports = winston;
