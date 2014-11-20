;(function(){ 

	/* inits */

	var messages = document.getElementById('messages');
	var audio = document.getElementById('audio');
	var quackCount = document.getElementById('quack_count');
	var counter = 0;




	/* helpers */

	var createUUID = function() {
	    // http://www.ietf.org/rfc/rfc4122.txt
	    var s = [];
	    var hexDigits = "0123456789abcdef";
	    for (var i = 0; i < 36; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	    s[8] = s[13] = s[18] = s[23] = "-";

	    var uuid = s.join("");
	    return uuid;
	};

	/* like set interval but only limited number of times */
	var startTimer = function(interval, repeat, myFunc,cb) {
		(function runFn() {
			if (repeat >= 0) {
				myFunc();
				repeat--;
				setTimeout(runFn, interval);
			} else { cb(); }
		})();
	};

	var showInOut = function(id,timer) {
		var el = document.getElementById(id);
		el.style.opacity = 1;
		el.style.display = "block";
		messages.classList.add('redduck');
		
		setTimeout(function(){
			el.style.opacity = 0;
			el.style.display = "none";
			messages.classList.remove('redduck'); 
		},timer);
	};

	var quackBack = function(msg){
		if(msg.uuid != settings.uuid) {
			showInOut("quackback",800);
			audio.play();
			setTimeout(function() { 
				rewind(audio); 
			},800);
		}
	};


	var rewind = function(src) {
		src.pause();
		src.currentTime = 0;
		src.load();
	};

	var publish = function(data) {
		client.publish(settings.channel, data);
	};


	/* gets count from last message, requires history to be enabled */

	/*var getStoredQuackCount = function() {
		pubnub.history({
			channel: settings.channel,
			limit: 1,
			callback: function(data) {
				counter = (data.hasOwnProperty('count') && typeof data.count == "number") ? data.count : 0;
			}
		});
	};*/

	/* mouseover listener */

	messages.addEventListener("mouseover",function(e) {
		quackCount.innerHTML = ++counter;
		audio.play();
		publish(JSON.stringify({ "uuid":settings.uuid, "action":"quack","color":"red","count":counter }));
		setTimeout(function() { rewind(audio); },800);
	});

	/* instantiate mqtt over web socket */

	var settings = { 
		channel: 'ducks/',
		server: 'test.mosquitto.org',
		port: 8080,
		uuid: createUUID()
	};

	var client = mows.createClient(settings.port,'ws://'+settings.server+'/mqtt');

	
	client.on('connect', function(){
		console.log('Client connected as ' + client.options.clientId);
		client.subscribe(settings.channel);
	});

	client.on('error', function(e){
		console.log('Client Error ' + e);
		console.log('Client Error:', e);
	});
	
	client.on('message', function(topic, message){
		console.log('Client received message: ' + message);
		quackBack(JSON.parse(message));
	});

	

})();