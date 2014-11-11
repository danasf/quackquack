;(function(){ 

	/* inits */

	var messages = document.getElementById('messages');
	var audio = document.getElementById('audio');
	var quackCount = document.getElementById('quack_count');
	var counter = 0;

	var settings = { 
		channel: 'ducks',
		pub_key: 'key', 
		sub_key: 'key',
	};

	/* helpers */

	var rewind = function(src) {
		src.pause();
		src.currentTime = 0;
		src.load();
	};

	var publish = function(data) {
		pubnub.publish({
			channel: settings.channel,
			message: data
		});
	};

	/* gets count from last message, requires history to be enabled */

	var getStoredQuackCount = function() {
		pubnub.history({
			channel: settings.channel,
			limit: 1,
			callback: function(data) {
				counter = (data.hasOwnProperty('count') && typeof data.count == "number") ? data.count : 0;
			}
		});
	};

	/* mouseover listener */

	messages.addEventListener("mouseover",function(e) {
		quackCount.innerHTML = ++counter;
		audio.play();
		publish({ action:"quack",color:"red",count:counter });
		setTimeout(function() { rewind(audio); },800);
	});

	/* instantiate pubnub */

	var pubnub = PUBNUB.init({ 
		subscribe_key: settings.sub_key,
		publish_key: settings.pub_key,
		ssl: true
	});

	pubnub.subscribe({ 
		channel : settings.channel,
		message : function(msg){  },
		connect : getStoredQuackCount
	});

})();