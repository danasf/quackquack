Internet Connected Toy Animals
=================

What
----

A "Hello, World"  using push notifications to control sound and lights on an internet-connected toy animal. 

Visit [Internet of Ducks](https://danasf.github.io/quackquack/www/index.html) to send a quack to an internet connected duck via push notification.

What you need 
----

1. An internet connected Raspberry Pi with lights and a speaker.

2. [PubNub](https://pubnub.com)'s easy-to-use push API and SDKs.

3. A homemade or re-purposed stuffed animal (instructions forthcoming).


Setup
----

1. Register for a [PubNub](https://pubnub.com) account. They provide a free development Sandbox, as well as a generous [platform evangelism program](http://www.pubnub.com/free-evangelism-program/) for students, makers, start-ups etc. 

2. Purchase a [Raspberry Pi](https://www.adafruit.com/search?q=raspberry+pi), LEDs, wifi dongle and speaker.

3. Configure your application settings in `app.js`

```
	var settings = { 
		channel: 'ducks',
		pub_key: 'pub key', 
		sub_key: 'sub key',
	};
```

4. Copy the `/www/` folder to your web host of choice, or run on localhost with `python -m SimpleHTTPServer 5000`

5. Clone the repo to your Raspberry Pi and install dependencies, configure and then run `client.py`

```
git clone https://github.com/danasf/quackquack
sudo apt-get install mplayer
sudo pip install pubnub
sudo python ~/quackquack/pyclient/client.py
```

6. Have fun!


Possible Future Variations
----

* Battery-operated, Bluetooth LE or Zigbee connected Arduino animals, routed by a central, Internet connected node (star topology). 
* Rolling my own protocol or XMPP service to handle push.

Media Credits
----
* [Quack](https://www.freesound.org/people/crazyduckman/sounds/185546/) CC-BY CrazyDuckMan
* [Rubber Duck](https://openclipart.org/detail/8881/rubber-duck-by-gerald_g-8881) via OpenClipart
* [Comic Neue](http://comicneue.com/) Font

License
----
MIT