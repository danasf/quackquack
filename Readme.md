Internet Connected Toy Animals
=================

A "Hello, World"  using push notifications to control sound and lights on an internet-connected toy animal. By popular demand it also implements 'quack backs' and will inform you when a peer has sent a message. I also reserve the right to unplug the speaker late at night :p

Visit [Internet of Ducks](https://danasf.github.io/quackquack/www/index.html) to make an an internet connected duck quack via push notification. 

What you need to make your own
----

1. An internet connected embedded device (Raspberry Pi, etc) with lights and a speaker.

2. [PubNub](https://pubnub.com)'s easy-to-use push API and SDKs. Or a [MQTT broker](http://www.mosquitto.org/).

3. A homemade or re-purposed stuffed animal (instructions forthcoming).


Setup
----

* Register for a [PubNub](https://pubnub.com) account. They provide a free development Sandbox, as well as a generous [platform evangelism program](http://www.pubnub.com/free-evangelism-program/) for students, makers, start-ups etc. 

* Or, alternatively, setup a MQTT broker. For testing and experimentation you can use a [public one](http://test.mosquitto.org/).

* Purchase a [Raspberry Pi](https://www.adafruit.com/search?q=raspberry+pi), LEDs, wifi dongle and speaker.

* Configure your application settings in `js/app.js`, these will vary slightly depending upon whether you use PubNub or MQTT.
```
	var settings = { 
		channel: 'ducks',
		pub_key: 'pub key', 
		sub_key: 'sub key',
	};
```

* Copy the `/www/` folder to your web host of choice, or run on localhost with `python -m SimpleHTTPServer 5000`

* Clone the repo to your Raspberry Pi and install dependencies, configure and then run `client.py`

```
git clone https://github.com/danasf/quackquack
sudo apt-get install mplayer
sudo pip install pubnub
sudo python ~/quackquack/pyclient/client.py
```

* Have fun!


Possible Future Variations
----

* Optimizing the physical duck. 
* Battery-operated, Bluetooth LE or Zigbee connected Arduino animals, routed by a central, Internet connected node (star topology). 

Media Credits
----
* [Quack](https://www.freesound.org/people/crazyduckman/sounds/185546/) CC-BY CrazyDuckMan
* [Rubber Duck](https://openclipart.org/detail/8881/rubber-duck-by-gerald_g-8881) via OpenClipart
* [Comic Neue](http://comicneue.com/) Font
* [PubNub](https://pubnub.com/)
* [MOWS](https://github.com/mcollina/mows) - MQTT over Web Socket

License
----
MIT 2014
