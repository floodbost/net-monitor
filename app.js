const Monitor = require('./lib/monitor');

const myApi = new Monitor({
    //website: 'http://vpsid.ridwan.id',
    address: 'ridwan.id',
    title: 'Raging Flame',
    interval: 1, // minutes
	//port: 0,
 
    // new options
    httpOptionsx: {
      path: '/',
      method: 'get'
    },
    expect: {
      statusCode: 200
    }
})
.on('up', function (res, state) {
    console.log('Yay!! ' + res.website + ' is up.');
	console.log(res, state);
})
.on('down', function (res) {
    console.log('Oh Snap!! ' + res.website + ' is down! ' + res.statusMessage);
});
