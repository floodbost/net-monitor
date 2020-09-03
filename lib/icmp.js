'use strict';

const net = require('net');
const utils = require('./utils');
const icmp = require('net-ping');
const dns = require('dns');
const isIp = require('is-ip');



module.exports = function(options, callback) {
  const session = icmp.createSession ();
  
  const ping = function(target, retry) {
    retry = retry || 0;
	
	if (retry >= 3) {
		callback(true, {time: -1});
		return;
	}
	
	session.pingHost (target, function (error, target, sent, rcvd) {
	if (error) {
		//console.log (target + ": " + error.toString ());
		ping(target, ++retry);
	}
	else {
		const ms = rcvd - sent;
		//console.log (target, ms);
		callback(false, {responseTime: ms});
	}   
	});
  };
  
  if (!isIp(options.address)) {
	  dns.resolve4(options.address, {}, function(err, addresses) {
		  console.log(err, addresses);
		  if (!err && addresses && Array.isArray(addresses)) {
			  const addr = addresses.shift();
			 ping(addr);
		  }
	  });
  } else {
	  ping(options.address);
  }
  
  
  
};